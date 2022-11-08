const { asyncMiddleware } = require("../middlewares");
const messages = require("./../constants/messages");
const Call = require("../models/call");
const { SUPPORT_PHONE_NUMBER } = require("../constants");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const axios = require("axios");
require("dotenv").config();

exports.voice = asyncMiddleware(async (request, response) => {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    numDigits: 1,
    action: "/api/twilio/gather",
  });
  // console.log({ gather: gather?.gather });
  gather.say(messages.TWILIO_CALL_WELCOME_MSG);
  twiml.redirect("/api/twilio/voice");

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  response.send(twiml.toString());
});

exports.gather = asyncMiddleware(async (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // If the user entered digits, process their request
  if (request.body.Digits) {
    switch (request.body.Digits) {
      case "1":
        twiml.say(messages.TWILIO_CALL_CONNECTING_SUPPORT);
        twiml.dial(SUPPORT_PHONE_NUMBER, {
          action: "/api/twilio/goodbye",
        });
        break;
      case "2":
        twiml.say(messages.TWILIO_CALL_BEFORE_VOICE_MSG);
        // Use <Record> to record and transcribe the caller's message
        twiml.record({ transcribe: true, maxLength: 30 });
        // End the call with <Hangup>
        twiml.hangup();
        break;
      default:
        twiml.say(messages.TWILIO_CALL_INVALID_CHOICE);
        twiml.pause();
        twiml.redirect("/api/twilio/voice");
        break;
    }
  } else {
    // If no input was sent, redirect to the /voice route
    twiml.redirect("/api/twilio/voice");
  }

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  response.send(twiml.toString());
});

exports.goodbye = asyncMiddleware(async (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say(messages.TWILIO_CALL_GOOD_BYE_MSG);
  twiml.hangup();
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

exports.status = asyncMiddleware(async (req, res) => {
  // Get call data from req body
  const {
    From: fromPhoneNumber,
    CallSid: sid,
    CallDuration: duration,
    CallStatus: status,
  } = req.body;

  // Send request to get call recording
  let url = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Calls/${sid}/Recordings.json`;
  const { data } = await axios.get(url, {
    auth: {
      username: process.env.TWILIO_ACCOUNT_SID,
      password: process.env.TWILIO_AUTH_TOKEN,
    },
  });
  let audioFileUrl = "";
  if (data?.recordings?.length) {
    audioFileUrl = data?.recordings?.[0]?.media_url;
  }

  // Store call data inside DB

  const call = new Call({
    sid,
    duration,
    fromPhoneNumber,
    status,
    audioFileUrl,
  });
  await call.save();
  // await Call.create();
  return res.status(200).json({ success: true });
});

exports.calllogs = asyncMiddleware(async (req, res) => {
  // Return all call logs from DB
  const callLogs = await Call.find({});
  return res.json({ success: true, data: callLogs });
});
