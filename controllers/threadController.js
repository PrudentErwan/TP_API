const Thread = require('../models/Thread');
const Message = require('../models/Message');
const Group = require('../models/Group');
const Event = require('../models/Event');
exports.getGroupThreadMessages = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }
        
        const messages = await Message.find({ filDeDiscussion: group.filDeDiscussion })
            .populate('auteur', 'nom prenom');
            
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

exports.postMessageToGroupThread = async (req, res, next) => {
    try {
        const { contenu } = req.body;
        const group = await Group.findById(req.params.groupId);
        
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }
        
        [cite_start]

        const message = await Message.create({
            contenu,
            auteur: req.user.id,
            filDeDiscussion: group.filDeDiscussion
        });
        
        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
};
