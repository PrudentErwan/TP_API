const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String },
    icône: { type: String },
    photoDeCouverture: { type: String },
    type: {
        type: String,
        enum: ['public', 'privé', 'secret'],
        required: true
    },
    membresPeuventPublier: { type: Boolean, default: true },
    membresPeuventCréerÉvénements: { type: Boolean, default: false },
    
    membres: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    administrateurs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    
    filDeDiscussion: { type: Schema.Types.ObjectId, ref: 'Thread' }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);