import React, { useState, useEffect } from "react";
import { Producto, PrecioEspecial } from "../types";
import { productosAPI, preciosEspecialesAPI } from "../services/api";

const Articulos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [preciosEspeciales, setPreciosEspeciales] = useState<PrecioEspecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<string>("user123"); // Simulando un usuario 
  
    useEffect(() => {
        cargarDatos();
    }
    , []);

    const cargarDatos = async () => {
        try {
            setLoading(true);
            const [productosRes, preciosRes] = await Promise.all([
                productosAPI.getAll(),
                preciosEspecialesAPI.getAll()
            ]);

            setProductos(productosRes.data);
            setPreciosEspeciales(preciosRes.data);
        } catch (err) {
            setError("Error al cargar los datos");
            console.error('Error:', err);
        }
        finally {
            setLoading(false);
        }   
};

    const obtenerPrecioFinal = (producto: Producto): number => {
        const precioEspecial = preciosEspeciales.find(pe => pe.productId === producto._id && pe.userId === usuarioActual);
        return precioEspecial ? precioEspecial.specialPrice : producto.price;};

        const tieneDescuento = (producto: Producto): boolean => {
            const precioEspecial = preciosEspeciales.find(pe => pe.productId === producto._id && pe.userId === usuarioActual);
            return !!precioEspecial && precioEspecial.specialPrice < producto.price;
        };

        if (loading) return <div className="loading">Cargando artículos...</div>;
        if (error) return <div className="error">{error}</div>;

    return (
        <div className="articulos-container">
            <h2>Lista de Artículos</h2>
            <p className="usuario-info">Usuario actual: <strong>{usuarioActual}</strong></p>

            <div className="table-container">
                <table className="productos-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Precio Original</th>
                            <th>Precio Final</th>
                            <th>Stock</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => {
                            const precioFinal = obtenerPrecioFinal(producto);
                            const descuento = tieneDescuento(producto);
                            
                            return (
                                <tr key={producto._id} className={descuento ? "descuento" : ""}>
                                    <td>{producto.name}</td>
                                    <td>{producto.category}</td>
                                    <td>{producto.brand || "N/A"}</td>
                                    <td className={descuento ? "precio-original" : ""}> ${producto.price.toLocaleString()}</td>
                                    <td className={descuento ? "precio-especial" : ""}> ${precioFinal.toLocaleString()}</td>
                                    <td>{producto.stock}</td>
                                    <td>{descuento ? (<span className="badge descuento-badge">Precio Especial</span>) : (<span className="badge normal-badge">Precio Normal</span>)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {productos.length === 0 && (
                <div className="no-productos">
                    No hay artículos disponibles en este momento.
                </div>
            )}
        </div>
    );
};

export default Articulos;