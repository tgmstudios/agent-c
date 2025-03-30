const express = require('express');
const router = express.Router();

const sessionRoutes = require('./session.js');
const userRoutes = require('./user.js');
const preferencesRoutes = require('./preferences.js');
const transcriptRoutes = require('./transcript.js');
const pathRoutes = require('./path.js');
const scheduleRoutes = require('./schedule.js');
const programs = require('./programs.js');

// Mount the routes on their respective paths
router.use('/session', sessionRoutes);
router.use('/user', userRoutes);
router.use('/user/preferences', preferencesRoutes);
router.use('/user/transcript', transcriptRoutes);
router.use('/path', pathRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/programs', programs);

module.exports = router;
