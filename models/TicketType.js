const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketTypeSchema = new Schema({
    événement: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    nom: { type: String, required: true },
    montant: { type: Number, required: true, min: 0 },
    quantitéRestante: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('TicketType', ticketTypeSchema);