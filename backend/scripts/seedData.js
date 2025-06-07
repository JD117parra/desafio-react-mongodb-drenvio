const { connectDB } = require('../config/database');
require('dotenv').config();

const productos = [
    {
        nombre: 'Producto 1',
        precio: 100,
        categoria: 'Categoria 1',
        stock: 50
    },
    {
        nombre: 'Producto 2',
        precio: 200,
        categoria: 'Categoria 2',
        stock: 30
    },
    {
        nombre: 'Producto 3',
        precio: 300,
        categoria: 'Categoria 3',
        stock: 20
    }
];

const seedProducts = async () => {
    try {
        const db = await connectDB();
        await db.collection('productos').insertMany(productos);
        console.log('Productos insertados correctamente');
        process.exit(0);
    }
    catch (error) {
        console.error('Error insertando productos:', error);
        process.exit(1);
    }
};

seedProducts();
