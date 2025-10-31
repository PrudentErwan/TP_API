const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    typeDeBillet: { type: Schema.Types.ObjectId, ref: 'TicketType', required: true },
    
    nom: { type: String, required: true },
    prénom: { type: String, required: true },
    adresseComplète: { type: String, required: true },
    
    utilisateur: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    
    dateAchat: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);