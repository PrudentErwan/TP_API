const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

exports.registerUser = async (req, res, next) => {
    const { nom, prenom, email, motDePasse } = req.body;
    try {

        const userExists = await User.findOne({ email }); 
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const salt = await bcrypt.genSalt(10);
        const motDePasseHashé = await bcrypt.hash(motDePasse, salt);

        const user = await User.create({
            nom,
            prenom,
            email,
            motDePasse: motDePasseHashé
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Données utilisateur invalides.' });
        }
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, motDePasse } = req.body;
    try {

        const user = await User.findOne({ email }).select('+motDePasse'); 

        if (user && (await bcrypt.compare(motDePasse, user.motDePasse))) {
            res.json({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res) => {

    res.json(req.user);
};