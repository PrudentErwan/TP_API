const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date },
    lieu: { type: String },
    photoDeCouverture: { type: String },
    visibilité: {
        type: String,
        enum: ['public', 'privé'],
        default: 'public'
    },
    
    organisateurs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    groupeParent: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
    filDeDiscussion: { type: Schema.Types.ObjectId, ref: 'Thread' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);