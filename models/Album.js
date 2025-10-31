const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true 
    },
    motDePasse: { type: String, required: true, select: false },
    photoDeProfil: { type: String },
    dateInscription: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);