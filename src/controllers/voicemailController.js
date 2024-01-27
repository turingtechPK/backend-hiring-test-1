// src/controllers/voicemailController.js
const { Call } = require('../models/callModel');

const voicemailController = async (req, res) => {
  const audioLink = req.body.RecordingUrl;

  // Update the call with voicemail details
  const lastCall = new Call({
    status: 'voicemail-left',
    audioLink,
    duration: calculateDuration(req.body.RecordingDuration),
  });

  // Save the voicemail information to the database
  await lastCall.save();

  res.status(200).end();
};

// Helper function to calculate the duration based on Twilio RecordingDuration format
const calculateDuration = (twilioDuration) => {
  const [minutes, seconds] = twilioDuration.split(':');
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
};

module.exports = { voicemailController };
