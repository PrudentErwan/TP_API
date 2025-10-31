const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoAlbumSchema = new Schema({
    titre: { type: String, default: 'Album de l\'événement' },
    événement: { type: Schema.Types.ObjectId, ref: 'Event', required: true }
}, { timestamps: true });

module.exports = mongoose.model('PhotoAlbum', photoAlbumSchema);