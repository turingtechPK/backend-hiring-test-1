import { RequestHandler } from "express";
import { twiml } from "twilio";
import Call from "../../model/Call";
import twilioClient from "../../../config/twillio";

export const incomingCalls: RequestHandler = async (req, res, next) => {
  try {
    await twilioClient.calls.create({
      to: "+923312358680", //compmnay number (had to be replaced with a new number)
      from: "+14152372804", // twilio provided number,
      twiml:
        '<Response><Say voice="woman">Hi thanks for calling. To redirect call press 1. For sending a voicemail, press 2.</Say><Gather input="dtmf" numDigits="1" action="https://27ab-39-34-177-21.ngrok-free.app/call/gather" method="POST"/></Response>',
    });
    console.log("Call has been initiated!");
    res.send("Call has been initiated!");
  } catch (error) {
    console.error("Error initiating a call", error);
    res.status(500).send("Internal Server Error");
  }
};

export const voiceMail: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    // Save the recording URL to your database or take other actions as needed
    await Call.create({
      to: body.To,
      from: body.From,
      status: body.CallStatus,
      callSid: body.CallSid,
      duration: body.RecordingDuration,
      recordingUrl: body.RecordingUrl,
    });
    console.log("Voicemail recorded. Recording URL:", body.RecordingUrl);
  } catch (error) {
    console.error("Error saving the voicemail:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const voice: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    console.log("body ===> ", body);
    // Log the call
    // await Call.create({
    //   to: callI.to,
    //   from: callI.from,
    //   status: callI.status,
    //   callISid: callI.sid,
    //   duration: callI.duration
    // });
  } catch (error) {
    console.error("Error saving the voice:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const gatherInput: RequestHandler = async (req, res, next) => {
  try {
    const { Digits } = req.body;
    console.log("req.body ==> ", req.body);
    // console.log("Gathering")
    const twiml_ = new twiml.VoiceResponse();
    // Case 1: Forward call
    switch (Digits) {
      case "1": {
        const call = await twilioClient.calls.create({
          to: "+923312358680", //my personal number
          from: "+14152372804", // twilio provided number,
          twiml:
            '<Response><Say voice="woman">Welcome to the new call with the agent!</Say><Gather input="speech" finishOnKey="*" action="https://27ab-39-34-177-21.ngrok-free.app/call/save" method="POST"/></Response>',
        });

        console.log("Customer conversation with the agent completed!");
        break;
      }
      case "2": {
        // If 2 is pressed, start recording and once the recording is done redirect to the url to save the recording in db
        twiml_.say(
          { voice: "woman", language: "en-US" },
          "Please leave a voicemail of upto 30 minutes after the beep."
        );
        twiml_.record({
          action:
            "https://27ab-39-34-177-21.ngrok-free.app/call/save/voicemail", // url to save the recording
          maxLength: 30,
          playBeep: true,
          method: "POST",
          finishOnKey: "*",
        });
        res.send(twiml_.toString());
        break;
      }
      default:
        // If the user pressed any other digit or no input, replay the menu
        twiml_.say(
          { voice: "woman", language: "en-US" },
          "Incorrect option selected."
        );
        twiml_.hangup();
        res.send(twiml_.toString());
        break;
    }
    return twiml;
  } catch (error) {
    console.error("Error gathering inout", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllCallLogs: RequestHandler = async (req, res, next) => {
    try {
        const calls = await Call.find()
        res.status(200).send({
            calls: calls
        })
    } catch (error) {
        console.error("Error getting call logs", error);
        res.status(500).send("Internal Server Error");
    }
} 
