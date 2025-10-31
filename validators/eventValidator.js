const Joi = require('joi');

exports.createEventSchema = Joi.object({
    nom: Joi.string().min(3).required(), 
    description: Joi.string().allow(''), 
    dateDebut: Joi.date().iso().required(), 
    dateFin: Joi.date().iso().min(Joi.ref('dateDebut')), 
    lieu: Joi.string().allow(''), 
    visibilité: Joi.string().valid('public', 'privé').default('public') 
});

exports.purchaseTicketSchema = Joi.object({
    typeId: Joi.string().hex().length(24).required(), 
    nom: Joi.string().required(), 
    prénom: Joi.string().required(), 
    adresseComplète: Joi.string().required() 
});