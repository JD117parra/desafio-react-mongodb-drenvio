import React, { useState, useEffect } from 'react';
import { Producto, PrecioEspecial } from '../types';
import { productosAPI, preciosEspecialesAPI } from '../services/api';

const Articulos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [preciosEspeciales, setPreciosEspeciales] = useState<PrecioEspecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<string>('admin');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Cargando productos...');
      const productosRes = await productosAPI.getAll();
      console.log('📦 Productos recibidos:', productosRes.data);
      
      console.log('💰 Cargando precios especiales...');
      const preciosRes = await preciosEspecialesAPI.getAll();
      console.log('🎯 Precios especiales recibidos:', preciosRes.data);
      
      // Validar que los datos sean arrays
      const productosData = Array.isArray(productosRes.data) ? productosRes.data : [];
      const preciosData = Array.isArray(preciosRes.data) ? preciosRes.data : [];
      
      setProductos(productosData);
      setPreciosEspeciales(preciosData);
      
      console.log('✅ Datos cargados exitosamente');
    } catch (err: any) {
      console.error('❌ Error completo:', err);
      setError(`Error cargando los datos: ${err.message || 'Error de conexión con el servidor'}`);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombreUsuario = (): string => {
    const usuarioConPrecio = preciosEspeciales.find(pe => pe.userId === usuarioActual);
    return usuarioConPrecio?.userName || 'Usuario no encontrado';
  }

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
    
    console.warn('⚠️ Producto sin precio válido:', producto);
    return 0;
  };

  const obtenerPrecioFinal = (producto: any): number => {
    if (!producto) return 0;
    
    const precioOriginal = obtenerPrecio(producto);
    
    const precioEspecial = preciosEspeciales.find(
      pe => pe.productId === producto._id && pe.userId === usuarioActual
    );
    
    return precioEspecial ? precioEspecial.specialPrice : precioOriginal;
  };

  const tieneDescuento = (producto: any): boolean => {
    if (!producto) return false;
    
    const precioOriginal = obtenerPrecio(producto);
    if (precioOriginal === 0) return false;
    
    const precioEspecial = preciosEspeciales.find(
      pe => pe.productId === producto._id && pe.userId === usuarioActual
    );
    
    return !!precioEspecial && precioEspecial.specialPrice < precioOriginal;
  };

  const obtenerNombre = (producto: any): string => {
    return producto?.name || producto?.nombre || 'Sin nombre';
  };

  const obtenerCategoria = (producto: any): string => {
    return producto?.category || producto?.categoria || 'Sin categoría';
  };

  const obtenerMarca = (producto: any): string => {
    return producto?.brand || producto?.marca || 'N/A';
  };

  const obtenerStock = (producto: any): number => {
    if (!producto) return 0;
    if (typeof producto.stock === 'number') return producto.stock;
    if (producto.stock && !isNaN(Number(producto.stock))) return Number(producto.stock);
    return 0;
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>🔄 Cargando productos...</h3>
        <p>Conectando con el servidor...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error">
        <h3>❌ Error</h3>
        <p>{error}</p>
        <button onClick={cargarDatos} style={{
          background: '#6366f1', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          🔄 Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="articulos-container">
      <h2>Lista de Artículos</h2>
      <p className="usuario-info">
      Usuario actual: <strong>{usuarioActual}</strong>
      {preciosEspeciales.some(pe => pe.userId === usuarioActual) && (
      <span> ({preciosEspeciales.find(pe => pe.userId === usuarioActual)?.userName || 'Sin nombre'})</span>
      )}
      </p>      

      <div style={{marginBottom: '1rem', color: '#6b7280'}}>
        📊 Total de productos: <strong>{productos.length}</strong> | 
        🏷️ Precios especiales: <strong>{preciosEspeciales.length}</strong>
      </div>
      
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
            {productos.map((producto, index) => {
              // Validar que el producto tenga ID
              if (!producto?._id) {
                console.warn('⚠️ Producto sin ID en índice', index, ':', producto);
                return (
                  <tr key={`invalid-${index}`}>
                    <td colSpan={7} style={{color: '#dc2626', fontStyle: 'italic'}}>
                      ⚠️ Producto con datos inválidos
                    </td>
                  </tr>
                );
              }
              
              const precioOriginal = obtenerPrecio(producto);
              const precioFinal = obtenerPrecioFinal(producto);
              const descuento = tieneDescuento(producto);
              
              return (
                <tr key={producto._id} className={descuento ? 'descuento' : ''}>
                  <td>{obtenerNombre(producto)}</td>
                  <td>{obtenerCategoria(producto)}</td>
                  <td>{obtenerMarca(producto)}</td>
                  <td className={descuento ? 'precio-original' : ''}>
                    ${precioOriginal.toLocaleString()}
                  </td>
                  <td className={descuento ? 'precio-especial' : ''}>
                    ${precioFinal.toLocaleString()}
                  </td>
                  <td>{obtenerStock(producto)}</td>
                  <td>
                    {descuento ? (
                      <span className="badge descuento-badge">💰 Precio Especial</span>
                    ) : (
                      <span className="badge normal-badge">🏷️ Precio Normal</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {productos.length === 0 && (
        <div className="no-productos">
          <h3>📦 No hay productos disponibles</h3>
          <p>Verifica que el backend esté corriendo en el puerto 5000</p>
          <button onClick={cargarDatos} style={{
            background: '#6366f1', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            🔄 Recargar productos
          </button>
        </div>
      )}
    </div>
  );
};

export default Articulos;