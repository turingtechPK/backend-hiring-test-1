// src/controllers/twilioController.js
const twilio = require('twilio');
const { Call } = require('../models/callModel');

const twilioController = async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const userInput = req.body.Digits;
  const callerNumber = req.body.From;
const personalPhoneNumber = process.env.PERSONAL_PHONE_NUMBER;
  const call = new Call({
    status: 'in-progress',
    duration: 0,
  });

  // Timestamp the start of the call
  call.startTime = new Date();

  if (userInput === '1') {
    twiml.dial(personalPhoneNumber);
  } else if (userInput === '2') {
    twiml.say('Please leave your message after the beep.');
    twiml.record({
      maxLength: 60,
      action: '/twilio/voicemail',
      method: 'POST',
    });
  } else {
    twiml.say('Invalid input. Goodbye.');
    call.status = 'ended';
  }

  // Save the call information to the database
  await call.save();

  res.type('text/xml');
  res.send(twiml.toString());
};

module.exports = { twilioController };
