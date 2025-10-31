const Event = require('../models/Event');
const Group = require('../models/Group');
const Thread = require('../models/Thread');

exports.createEvent = async (req, res, next) => {
    try {
        const { nom, description, dateDebut, dateFin, lieu, visibilité } = req.body;
        const createurId = req.user._id;

        const newThread = new Thread();

        const newEvent = new Event({
            nom,
            description,
            dateDebut,
            dateFin,
            lieu,
            visibilité,
            organisateurs: [createurId],
            participants: [createurId],
            filDeDiscussion: newThread._id
        });

        newThread.événementLié = newEvent._id;
        
        await newThread.save();
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
};

exports.createEventInGroup = async (req, res, next) => {
    try {
        const { groupId } = req.params;
        const { nom, description, dateDebut, lieu } = req.body;
        const createurId = req.user._id;
        
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé.' });
        }
        
        const newThread = new Thread();
        
        const newEvent = new Event({
            nom,
            description,
            dateDebut,
            lieu,
            organisateurs: [createurId],
            participants: [...(group.membres || [])], 
            groupeParent: groupId,
            visibilité: group.type === 'public' ? 'public' : 'privé',
            filDeDiscussion: newThread._id
        });
        
        newThread.événementLié = newEvent._id;
        
        await newThread.save();
        await newEvent.save();
        
        res.status(201).json(newEvent);
    } catch (error) {
        next(error);
    }
};

exports.getEventDetails = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.eventId).populate('participants', 'nom prenom');
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé.' });
        }
        res.json(event);
    } catch (error) {
        next(error);
    }
};