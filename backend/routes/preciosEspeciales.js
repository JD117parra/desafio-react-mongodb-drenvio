const express = require('express');
const {getDB} = require('../config/database');
const router = express.Router();

const COLLECTION_NAME = 'preciosEspecialesParra11';

// Get all special prices
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const preciosEspeciales = await db.collection(COLLECTION_NAME).find({}).toArray();
        res.json(preciosEspeciales);
    } catch (error) {
        console.error('Error obteniendo precios especiales:', error);
        res.status(500).json({ message: 'Error del Servidor' });
    }
});

// Add special price

router.post('/', async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection(COLLECTION_NAME).insertOne(req.body);
        res.status(201).json({ sucess: true, insertedId: result.insertedId });
    } catch (error) {
        console.error('Error agregando precio especial:', error);
        res.status(500).json({ message: 'Error del Servidor' });
    }
}
);

// Verifies if an user has a special price
router.get('/verificar/:userId', async (req, res) => {
    try {
        const db = getDB();
        const { userId } = req.params;
        const usuario = await db.collection(COLLECTION_NAME).findOne({ userId});
        res.json({ tienePrecioEspecial: !!usuario });
    } catch (error) {
        console.error('Error verificando precio especial:', error);
        res.status(500).json({ message: 'Error del Servidor' });
    }
});

module.exports = router;