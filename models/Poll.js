const mongoose = require('mongoose');
const { Schema } = mongoose;

const optionSchema = new Schema({
    texte: { type: String, required: true }
});

const questionSchema = new Schema({
    texte: { type: String, required: true },
    options: [optionSchema]
});

const pollSchema = new Schema({
    titre: { type: String, required: true },
    crééPar: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    événement: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    questions: [questionSchema],
    
    réponses: [{
        utilisateur: { type: Schema.Types.ObjectId, ref: 'User' },
        réponsesQuestion: [{
            questionId: { type: Schema.Types.ObjectId },
            optionChoisieId: { type: Schema.Types.ObjectId }
        }]
    }]
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);