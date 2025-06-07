import React, { useState, useEffect } from 'react';
import { Producto, PrecioEspecial } from '../types';
import { productosAPI, preciosEspecialesAPI } from '../services/api';

const Subida: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    productId: '',
    specialPrice: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{tipo: 'success' | 'error', texto: string} | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      console.log('📦 Cargando productos para el formulario...');
      const response = await productosAPI.getAll();
      console.log('✅ Productos cargados:', response.data);
      
      const productosData = Array.isArray(response.data) ? response.data : [];
      setProductos(productosData);
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      setMensaje({tipo: 'error', texto: 'Error cargando productos'});
    }
  };

  // Función segura para obtener el precio
  const obtenerPrecio = (producto: any): number => {
    if (!producto) return 0;
    
    // Probar diferentes formatos de precio
    if (typeof producto.price === 'number') return producto.price;
    if (typeof producto.precio === 'number') return producto.precio;
    
    // Si el precio viene como string, convertirlo
    if (producto.price && !isNaN(Number(producto.price))) {
      return Number(producto.price);
    }
    if (producto.precio && !isNaN(Number(producto.precio))) {
      return Number(producto.precio);
    }
    
    return 0;
  };

  // Función segura para obtener el nombre
  const obtenerNombre = (producto: any): string => {
    return producto?.name || producto?.nombre || 'Sin nombre';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);

    try {
      // Validar datos
      if (!formData.userId.trim()) {
        throw new Error('ID de usuario es requerido');
      }
      if (!formData.userName.trim()) {
        throw new Error('Nombre de usuario es requerido');
      }
      if (!formData.productId) {
        throw new Error('Debe seleccionar un producto');
      }
      if (!formData.specialPrice || isNaN(Number(formData.specialPrice))) {
        throw new Error('Precio especial debe ser un número válido');
      }

      const precioEspecial: Omit<PrecioEspecial, '_id'> = {
        userId: formData.userId.trim(),
        userName: formData.userName.trim(),
        productId: formData.productId,
        specialPrice: parseFloat(formData.specialPrice)
      };

      console.log('💾 Guardando precio especial:', precioEspecial);
      await preciosEspecialesAPI.create(precioEspecial);
      
      setMensaje({tipo: 'success', texto: '✅ Precio especial agregado exitosamente'});
      setFormData({
        userId: '',
        userName: '',
        productId: '',
        specialPrice: ''
      });
    } catch (error: any) {
      console.error('❌ Error agregando precio especial:', error);
      setMensaje({tipo: 'error', texto: `❌ ${error.message || 'Error agregando precio especial'}`});
    } finally {
      setLoading(false);
    }
  };

  const productoSeleccionado = productos.find(p => p._id === formData.productId);

  return (
    <div className="subida-container">
      <h2>Agregar Precio Especial</h2>
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Complete el formulario para agregar un precio especial para un usuario específico
      </p>
      
      <form onSubmit={handleSubmit} className="subida-form">
        <div className="form-group">
          <label htmlFor="userId">ID de Usuario:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            required
            placeholder="Ej: user123"
          />
          <small style={{color: '#6b7280'}}>Identificador único del usuario</small>
        </div>

        <div className="form-group">
          <label htmlFor="userName">Nombre de Usuario:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            required
            placeholder="Ej: Juan Pérez"
          />
          <small style={{color: '#6b7280'}}>Nombre completo del usuario</small>
        </div>

        <div className="form-group">
          <label htmlFor="productId">Producto:</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un producto</option>
            {productos.map(producto => {
              const nombre = obtenerNombre(producto);
              const precio = obtenerPrecio(producto);
              
              return (
                <option key={producto._id} value={producto._id}>
                  {nombre} - ${precio.toLocaleString()}
                </option>
              );
            })}
          </select>
          <small style={{color: '#6b7280'}}>Producto al que aplicar el precio especial</small>
        </div>

        {productoSeleccionado && (
          <div className="producto-info">
            <h4>ℹ️ Información del Producto:</h4>
            <p><strong>Nombre:</strong> {obtenerNombre(productoSeleccionado)}</p>
            <p><strong>Precio Original:</strong> ${obtenerPrecio(productoSeleccionado).toLocaleString()}</p>
            <p><strong>Categoría:</strong> {productoSeleccionado.category || productoSeleccionado.categoria || 'N/A'}</p>
            <p><strong>Stock:</strong> {productoSeleccionado.stock || 0}</p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="specialPrice">Precio Especial:</label>
          <input
            type="number"
            id="specialPrice"
            name="specialPrice"
            value={formData.specialPrice}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            placeholder="Ej: 250.00"
          />
          <small style={{color: '#6b7280'}}>
            Precio especial para este usuario (debe ser menor al precio original)
          </small>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? '⏳ Agregando...' : '💾 Agregar Precio Especial'}
        </button>
      </form>

      {mensaje && (
        <div className={`mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      {productos.length === 0 && (
        <div style={{
          background: '#f3f4f6', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginTop: '1rem',
          color: '#6b7280'
        }}>
          ⚠️ No hay productos disponibles. Verifica que el backend esté funcionando.
        </div>
      )}
    </div>
  );
};

export default Subida;