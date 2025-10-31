
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connecté: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB: ${error.message}`);
        process.exit(1);
    }
};
module.exports = connectDB;