const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ 
                message: "Erreur de validation des données.",
                details: error.details[0].message 
            });
        }
        next();
    };
};

module.exports = validate;