const PhotoAlbum = require('../models/PhotoAlbum');
const Photo = require('../models/Photo');
const Comment = require('../models/Comment');

exports.createAlbum = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { titre } = req.body;
        const album = await PhotoAlbum.create({
            titre,
            événement: eventId
        });
        res.status(201).json(album);
    } catch (error) {
        next(error);
    }
};

exports.uploadPhoto = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const { url, description } = req.body;
        const photo = await Photo.create({
            url,
            description,
            postéePar: req.user._id,
            album: albumId
        });
        res.status(201).json(photo);
    } catch (error) {
        next(error);
    }
};

exports.addCommentToPhoto = async (req, res, next) => {
    try {
        const { photoId } = req.params;
        const { texte } = req.body;
        const comment = await Comment.create({
            texte,
            auteur: req.user._id, 
            photo: photoId
        });
        
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};