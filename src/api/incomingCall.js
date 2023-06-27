const express = require('express');
const twilio = require('twilio');
const Call = require('../models/calls');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
let callId;
let callTwilo;
const TWILIO_PHONE = process.env.TWILIO_PHONE
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN =  process.env.TWILIO_AUTH_TOKEN
const PERSONAL_PHONE_NUMBER = process.env.PERSONAL_PHONE_NUMBER
const PERSONAL_PHONE_NUMBER_TWO = process.env.PERSONAL_PHONE_NUMBER_TWO
const handleCall = router.post('/incoming-call', async (req, res) => {
  try {
    const twilioVoiceResponse = new twilio.twiml.VoiceResponse();
    const {
      From: caller, Digits: digitPressed, RecordingUrl, RecordingDuration
    } = req.body;

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    client.calls.create({
      url: 'https://4633-119-158-101-62.ngrok-free.app/incoming-call',
      to: PERSONAL_PHONE_NUMBER,
      from: TWILIO_PHONE,
    })
      .then((call) => {
        console.log(call.sid);
        callTwilo = call.sid;
      });
    const call = await Call.create({
      caller,
      status: 'in-progress',
      duration: 0,
      audioFileLink: '',
    });

    callId = call.id;

    const updateCallStatus = async (status, duration, audioFileLink) => {
      await Call.update(
        { status, duration, audioFileLink },
        { where: { id: callId } }
      );
    };

    twilioVoiceResponse.say('Welcome to the IVR system! Press 1 to forward this call. Press 2 to leave a voicemail');

    const gather = twilioVoiceResponse.gather({
      action: '/gather-response',
      method: 'POST',
      numDigits: 1,
      timeout: 5,
    });

    res.type('text/xml').send(twilioVoiceResponse.toString());
  } catch (error) {
    console.error('Error processing incoming call:', error);
    const twilioVoiceResponse = new twilio.twiml.VoiceResponse();
    twilioVoiceResponse.hangup();
    res.status(500).end();
  }
});

const gatherResponse = router.post('/gather-response', async (req, res) => {
  const twilioVoiceResponse = new twilio.twiml.VoiceResponse();
  const digitPressed = req.body.Digits;

  switch (digitPressed) {
    case '1':
      const dial = twilioVoiceResponse.dial();
      dial.number(PERSONAL_PHONE_NUMBER_TWO);
      break;
    case '2':
      twilioVoiceResponse.say('Please leave your voicemail after the beep. Press # when finished. beep');

      const gather2 = twilioVoiceResponse.gather({
        action: '/record-voicemail',
        method: 'POST',
        input: 'speech',
        timeout: 10,
        speechTimeout: 'auto',
        finishOnKey: '#',
      });

      break;
    default:
      twilioVoiceResponse.say('Invalid input. Please try again.');
      twilioVoiceResponse.redirect('/incoming-call');
      break;
  }

  res.type('text/xml').send(twilioVoiceResponse.toString());
});

const recordVoiceMail = router.post('/record-voicemail', async (req, res) => {
  const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const fromTwilio = await twilioClient.calls(callTwilo).fetch();
  const recordingDuration = fromTwilio.duration;
  const recordingUrl = fromTwilio.subresourceUris.recordings;
  await Call.update(
    { status: 'completed', duration: recordingDuration, audioFileLink: recordingUrl },
    { where: { id: callId } }
  );

  const twilioVoiceResponse = new twilio.twiml.VoiceResponse();
  twilioVoiceResponse.say('Thank you for leaving a voicemail. Goodbye!');
  twilioVoiceResponse.hangup();
  res.type('text/xml').send(twilioVoiceResponse.toString());
});

module.exports = { handleCall, gatherResponse, recordVoiceMail };
