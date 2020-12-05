const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const videoRoutes = require('./video');

router.use('/users', userRoutes);
router.use('/videos', videoRoutes);

module.exports = router;