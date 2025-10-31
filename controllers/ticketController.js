const TicketType = require('../models/TicketType');
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.createTicketType = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { nom, montant, quantitéRestante } = req.body;

        [cite_start]

        const ticketType = await TicketType.create({
            événement: eventId,
            nom,
            montant,
            quantitéRestante
        });
        res.status(201).json(ticketType);
    } catch (error) {
        next(error);
    }
};

exports.listTicketTypesForEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const types = await TicketType.find({ événement: eventId });
        res.json(types);
    } catch (error) {
        next(error);
    }
};

exports.purchaseTicket = async (req, res, next) => {
    try {
        const { typeId } = req.body; 
        const { nom, prénom, adresseComplète } = req.body; 

        const ticketType = await TicketType.findById(typeId);

        if (!ticketType) {
            return res.status(404).json({ message: 'Type de billet non trouvé.' });
        }
        if (ticketType.quantitéRestante <= 0) {
            return res.status(400).json({ message: 'Billet épuisé.' });
        }

        ticketType.quantitéRestante -= 1;
        
        const ticket = new Ticket({
            typeDeBillet: typeId,
            nom,
            prénom,
            adresseComplète,
            utilisateur: req.user ? req.user.id : null
        });

        await ticketType.save();
        await ticket.save();

        res.status(201).json(ticket);
    } catch (error) {
        next(error);
    }
};