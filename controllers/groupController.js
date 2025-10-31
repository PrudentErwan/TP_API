const Group = require('../models/Group');
const Thread = require('../models/Thread');
const User = require('../models/User');

exports.createGroup = async (req, res, next) => {
    try {
        const { nom, description, type, membresPeuventPublier, membresPeuventCréerÉvénements } = req.body;
        const createurId = req.user.id;

        [cite_start]
        const newThread = new Thread();
        
        const newGroup = new Group({
            nom,
            description,
            type,
            membresPeuventPublier,
            membresPeuventCréerÉvénements,
            administrateurs: [createurId],
            membres: [createurId],
            filDeDiscussion: newThread._id
        });
        
        newThread.groupeLié = newGroup._id;
        
        await newThread.save();
        await newGroup.save();

        res.status(201).json(newGroup);
    } catch (error) {
        next(error);
    }
};

exports.getGroupDetails = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('membres', 'nom prenom');
        
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }       
        res.json(group);
    } catch (error) {
        next(error);
    }
};

exports.addGroupMember = async (req, res, next) => {
    try {
        const group = await Group.findById(req.params.groupId);
        const userIdToAdd = req.body.userId; 

        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }
        if (!group.membres.includes(userIdToAdd)) {
            group.membres.push(userIdToAdd);
            await group.save();
        }
        
        res.status(200).json(group.membres);
    } catch (error) {
        next(error);
    }
};