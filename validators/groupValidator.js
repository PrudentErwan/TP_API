const Joi = require('joi');

exports.createGroupSchema = Joi.object({
    nom: Joi.string().min(3).max(100).required(), 
    description: Joi.string().max(500).allow(''), 
    type: Joi.string().valid('public', 'privé', 'secret').required(), 
    membresPeuventPublier: Joi.boolean().default(true), 
    membresPeuventCréerÉvénements: Joi.boolean().default(false) 
});