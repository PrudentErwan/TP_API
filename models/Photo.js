const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String },
    postéePar: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    album: { type: Schema.Types.ObjectId, ref: 'PhotoAlbum', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);