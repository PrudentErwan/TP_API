// Fichier: /routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/authValidator'); // On aura besoin de ça
const validate = require('../middleware/validationMiddleware');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /v1/auth/register
router.post('/register', validate(registerSchema), registerUser);

// @route   POST /v1/auth/login
router.post('/login', validate(loginSchema), loginUser);

// @route   GET /v1/auth/me
router.get('/me', protect, getUserProfile); // Route protégée

module.exports = router;