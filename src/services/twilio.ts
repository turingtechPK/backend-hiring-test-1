import { BadRequestException } from "../common/helpers";
const CallLogs = require("../model/call-logs");
const { VoiceResponse } = require("twilio").twiml;
import * as Twilio from "twilio";

export const handleCall = async (callId: string, from: string) => {
  try {
    //save call logs
    const call = new CallLogs({
      from,
      sid: callId,
      startTime: new Date(),
    });
    await call.save();

    //generate twiml response
    const twiml = new VoiceResponse();
    twiml.say(
      "Thanks for calling. Press 1 to forward the call, Press 2 to leave a voicemail."
    );
    twiml.gather({
      input: "dtmf",
      timeout: 10,
      numDigits: 1,
      action: `/handleUserInput?callId=${callId}`,
      method: "POST",
    });
    return twiml;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const handleUserInput = async (digitPressed: string, callId: string) => {
  try {
    const twiml = new VoiceResponse();
    if (digitPressed === "1") {
      const phoneNumber = '+16592180988';
      twiml.say("Forwarding your call.");
      // Forward call to your personal phone
      await dialNumber(phoneNumber);
      await handleCallEnd(callId)
    } else if (digitPressed === "2") {
      twiml.say("Leave a voice message after the beep.");
      twiml.record({
        action: "/handleVoicemail",
        method: "POST",
        maxLength: 60,
        playBeep: true,
        transcribe: true,
      });
    } else {
      twiml.say(`You Pressed Invalid Command`);
      twiml.hangup();
    }
    return twiml;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const handleVoicemail = async (recordingUrl: string, callId: string) => {
  try {
    const twiml = new VoiceResponse();
    await CallLogs.findOneAndUpdate(
      { sid: callId },
      { recordingUrl, digitPressed: "2" }
    );
    return twiml;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const handleCallEnd = async (callId: string) => {
  try {
    const twiml = new VoiceResponse();
    await CallLogs.findOneAndUpdate({ sid: callId }, { digitPressed: "1" });
    return twiml;
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};

export const dialNumber = async (to: string) => {
  try {
    const from = process.env.CALLER_NUMBER;
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioClient = new Twilio.Twilio(accountSid, authToken, {
      autoRetry: true,
      maxRetries: 3,
      logLevel: "debug",
    });
    return await twilioClient.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to,
      from,
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
};
