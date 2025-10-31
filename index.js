require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const mainRouter = require('./routes');

connectDB();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use('/v1', mainRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: err.message || 'Une erreur serveur est survenue.' 
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});