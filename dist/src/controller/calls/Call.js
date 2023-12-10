"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatherInput = exports.voice = exports.voiceMail = exports.incomingCalls = void 0;
const twilio_1 = require("twilio");
const Call_1 = __importDefault(require("../../model/Call"));
const twillio_1 = __importDefault(require("../../../config/twillio"));
const incomingCalls = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield twillio_1.default.calls.create({
            to: "+923312358680", //compmnay number (had to be replaced with a new number)
            from: "+14152372804", // twilio provided number,
            twiml: '<Response><Say voice="woman">Hi thanks for calling. To redirect call press 1. For sending a voicemail, press 2.</Say><Gather input="dtmf" numDigits="1" action="https://27ab-39-34-177-21.ngrok-free.app/call/gather" method="POST"/></Response>',
        });
        console.log("Call has been initiated!");
        res.send("Call has been initiated!");
    }
    catch (error) {
        console.error("Error initiating a call", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.incomingCalls = incomingCalls;
const voiceMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Save the recording URL to your database or take other actions as needed
        yield Call_1.default.create({
            to: body.To,
            from: body.From,
            status: body.CallStatus,
            callSid: body.CallSid,
            duration: body.RecordingDuration,
            recordingUrl: body.RecordingUrl,
        });
        console.log("Voicemail recorded. Recording URL:", body.RecordingUrl);
    }
    catch (error) {
        console.error("Error saving the voicemail:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.voiceMail = voiceMail;
const voice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        console.error("Error saving the voice:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.voice = voice;
const gatherInput = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Digits } = req.body;
        console.log("req.body ==> ", req.body);
        // console.log("Gathering")
        const twiml_ = new twilio_1.twiml.VoiceResponse();
        // Case 1: Forward call
        switch (Digits) {
            case "1": {
                const call = yield twillio_1.default.calls.create({
                    to: "+923312358680", //my personal number
                    from: "+14152372804", // twilio provided number,
                    twiml: '<Response><Say voice="woman">Welcome to the new call with the agent!</Say><Gather input="speech" finishOnKey="*" action="https://27ab-39-34-177-21.ngrok-free.app/call/save" method="POST"/></Response>',
                });
                console.log("Customer conversation with the agent completed!");
                break;
            }
            case "2": {
                // If 2 is pressed, start recording and once the recording is done redirect to the url to save the recording in db
                twiml_.say({ voice: "woman", language: "en-US" }, "Please leave a voicemail of upto 30 minutes after the beep.");
                twiml_.record({
                    action: "https://27ab-39-34-177-21.ngrok-free.app/call/save/voicemail", // url to save the recording
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
                twiml_.say({ voice: "woman", language: "en-US" }, "Incorrect option selected.");
                twiml_.hangup();
                res.send(twiml_.toString());
                break;
        }
        return twilio_1.twiml;
    }
    catch (error) {
        console.error("Error gathering inout", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.gatherInput = gatherInput;
