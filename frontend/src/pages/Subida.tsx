import React, { useState, useEffect } from "react";
import { Producto, PrecioEspecial } from "../types";
import { productosAPI, preciosEspecialesAPI } from "../services/api";

const Subida: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [formData, setFormData] = useState({
        userId: "",
        userName: "",
        productId: "",
        specialPrice: "",
    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const response = await productosAPI.getAll();
            setProductos(response.data);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        setMensaje({ tipo: 'error', texto: 'Error al cargar los productos' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null);

        try {
            const precioEspecial: Omit<PrecioEspecial, '_id'> = {
                userId: formData.userId,
                userName: formData.userName,
                productId: formData.productId,
                specialPrice: parseFloat(formData.specialPrice)
            };

            await preciosEspecialesAPI.create(precioEspecial);

            setMensaje({ tipo: 'success', texto: 'Precio especial creado exitosamente' });
            setFormData({
                userId: "",
                userName: "",
                productId: "",
                specialPrice: "",
            });
        } catch (error) {
            console.error("Error al crear el precio especial:", error);
            setMensaje({ tipo: 'error', texto: 'Error al crear el precio especial' });
        } finally {
            setLoading(false);
        }
    };

    const productoSeleccionado = productos.find(p => p._id === formData.productId);
            
        return (
            <div className="subida-container">
                <h2>Agregar Precio Especial</h2>

                <form onSubmit={handleSubmit} className="subida-form">
                    <div className="form-group">
                        <label htmlFor="userId">ID de Usuario:</label>
                        <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleInputChange} required placeholder="Ej: user123"/>
                    </div>
                     
                    <div className="form-group">
                        <label htmlFor="userName">Nombre de Usuario:</label>
                        <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleInputChange} required placeholder="Ej: Juan Perez"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="productId">ID de Producto:</label>
                        <select id="productId" name="productId" value={formData.productId} onChange={handleInputChange} required>
                            <option value="">Seleccione un producto</option>
                            {productos.map(producto => (
                                <option key={producto._id} value={producto._id}>{producto.name} - ${producto.price.toLocaleString()}</option>
                            ))}
                        </select>
                    </div>

                    {productoSeleccionado && (
                        <div className="producto-info">
                            <h4>Información del Producto:</h4>
                            <p><strong>Nombre:</strong> {productoSeleccionado.name}</p>
                            <p><strong>Precio Original:</strong> ${productoSeleccionado.price.toLocaleString()}</p>
                            <p><strong>Categoría:</strong> {productoSeleccionado.category}</p>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="specialPrice">Precio Especial:</label>
                        <input type="number" id="specialPrice" name="specialPrice" value={formData.specialPrice} onChange={handleInputChange} required min="0" step="0.01" placeholder="Ej: 250.00"/>
                    </div>

                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Agregando...' : 'Agregar Precio Especial'}
                    </button>

                </form>

                {mensaje && (
                    <div className={`mensaje ${mensaje.tipo}`}>
                        {mensaje.texto}
                    </div>
                )}
            </div>
        );
};

            export default Subida;
