// src/routes/index.js
const express = require('express');
const { twilioController } = require('../controllers/twilioController');
const { voicemailController } = require('../controllers/voicemailController');
const { getActivityFeed } = require('../controllers/activityFeedController');

const router = express.Router();

router.post('/twilio/webhook', twilioController);
router.post('/twilio/voicemail', voicemailController);
router.get('/activity-feed', getActivityFeed);

module.exports = router;
