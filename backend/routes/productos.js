const express = require('express');
const {getDB} = require('../config/database');
const router = express.Router();

// Get all products

router.get('/', async (req, res) => {
    try {
        console.log('Fetching all products');
        const db = getDB();
        console.log('Database connection established');

        const collections = await db.listCollections().toArray();
        console.log('Collections in the database:', collections.map(c => c.name));

        const count = await db.collection('productos').countDocuments();
        console.log('Number of products in the collection:', count);

        const productos = await db.collection('productos').find({}).toArray();
        console.log('Products fetched successfully:', productos);

        res.json(productos);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error del Servidor', details: error.message });
    }
});

module.exports = router;