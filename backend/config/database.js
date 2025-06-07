const {MongoClient} = require('mongodb');

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log('Connected to MongoDB');
        return db; 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };