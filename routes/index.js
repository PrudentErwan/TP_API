const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const groupRoutes = require('./groupRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/events', eventRoutes);

module.exports = router;