const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productosRouter = require('./routes/productos');
const preciosEspecialesRouter = require('./routes/preciosEspeciales');


// Use routes
app.use('/api/productos', productosRouter);
app.use('/api/precios-especiales', preciosEspecialesRouter);

// basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Initiate server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();