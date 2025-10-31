const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    contenu: { type: String, required: true },
    auteur: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    filDeDiscussion: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
    
    messageParent: { 
        type: Schema.Types.ObjectId, 
        ref: 'Message', 
        default: null 
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);