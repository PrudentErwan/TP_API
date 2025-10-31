const Poll = require('../models/Poll');
const Event = require('../models/Event');

exports.createPoll = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { titre, questions } = req.body;

        [cite_start]

        const poll = await Poll.create({
            titre,
            questions, 
            crééPar: req.user.id,
            événement: eventId
        });
        res.status(201).json(poll);
    } catch (error) {
        next(error);
    }
};

exports.getPoll = async (req, res, next) => {
    try {
        const poll = await Poll.findById(req.params.pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }
        res.json(poll);
    } catch (error) {
        next(error);
    }
};

exports.submitPollResponse = async (req, res, next) => {
    try {
        const { pollId } = req.params;
        const { reponses } = req.body; 
        const userId = req.user.id;
        
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return res.status(404).json({ message: 'Sondage non trouvé.' });
        }

        [cite_start]

        const nouvelleReponse = {
            utilisateur: userId,
            réponsesQuestion: reponses
        };

        poll.réponses = poll.réponses.filter(r => !r.utilisateur.equals(userId));
        poll.réponses.push(nouvelleReponse);
        
        await poll.save();
        res.status(200).json(poll.réponses);
    } catch (error) {
        next(error);
    }
};