const VoiceResponse = require("twilio").twiml.VoiceResponse;

const AudioCall = require("../models/audioCall.model");
const { voicePrompts } = require("../constants/twilio");

const CONNECT_URL = "/api/v1/audioCall/connect";
const END_URL = "/api/v1/audioCall/end";
const INPUT_URL = "/api/v1/audioCall/input";

const handleConnect = () => {
  const response = new VoiceResponse();
  const inputRequest = response.gather({
    numDigits: 1,
    action: INPUT_URL,
    method: "POST",
    timeout: 5,
  });
  inputRequest.say(voicePrompts.WELCOME_CALL);

  response.redirect(
    {
      method: "POST",
    },
    CONNECT_URL
  );

  return response.toString();
};

const handleInput = (digits) => {
  const response = new VoiceResponse();

  if (!digits) {
    response.redirect(
      {
        method: "POST",
      },
      CONNECT_URL
    );
  }
  if (digits === "1") {
    response.say(voicePrompts.CONNECTING_SUPPORT);
    response.dial(process.env.TWILIO_PHONE_NUMBER, {
      action: END_URL,
    });
  } else if (digits === "2") {
    response.say(voicePrompts.VOICEMAIL);
    response.record({ transcribe: true, maxLength: 30, playBeep: true });

    response.redirect(
      {
        method: "POST",
      },
      END_URL
    );
  } else {
    response.say(voicePrompts.INVALID_OPTION);
    response.pause({
      length: 2,
    });
    response.redirect(
      {
        method: "POST",
      },
      CONNECT_URL
    );
  }

  return response.toString();
};

const createEndCallRequest = () => {
  const response = new VoiceResponse();
  response.say(voicePrompts.GOODBYE);
  response.hangup();

  return response.toString();
};

const logCall = async (sid, callStatus, callDuration, audioFileLink, from) => {
  return AudioCall.create(
    sid,
    callStatus,
    callDuration,
    audioFileLink,
    from
  );
};

const logs = async () => {
  const callLogs = await AudioCall.find();
  return callLogs;
};

module.exports = {
  handleConnect,
  handleInput,
  createEndCallRequest,
  logCall,
  logs,
};
