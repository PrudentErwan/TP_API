const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    texte: { type: String, required: true },
    auteur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: Schema.Types.ObjectId, ref: 'Photo', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);