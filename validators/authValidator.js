
const Joi = require('joi');

exports.registerSchema = Joi.object({
    nom: Joi.string().min(2).required(),
    prenom: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    motDePasse: Joi.string().min(6).required()
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    motDePasse: Joi.string().required()
});