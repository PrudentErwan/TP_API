const mongoose = require('mongoose');
const { Schema } = mongoose;

const threadSchema = new Schema({
    groupeLié: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        default: null
    },
    événementLié: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Thread', threadSchema);