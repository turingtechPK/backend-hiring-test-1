import VoiceResponse from "twilio/lib/twiml/VoiceResponse.js";
import asyncHandler from "express-async-handler";
import Record from "../models/recording.model.js";
import Call from "../models/call.model.js";


/**
 * Greet customer and offer choice,
 *
 * @route POST /turing-tech/welcome
 */
const welcome = asyncHandler(async (req, res) => {
    const response = new VoiceResponse();
    const gather = response.gather({
        numDigits: 1,
        action: "/turing-tech/digit-lookup",
        method: "POST",
    });
    gather.say(
        "Thank you for calling Turing Technologies! " +
        "If you wish to talk to one of our representatives, please press 1. " +
        "For a voice message, please press 2."
    );

    // Render the response as XML in reply to the webhook request
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
});


/**
 * Check if correct digit was pressed and redirect accordingly,
 *
 * @route POST /turing-tech/digit-lookup
 */
const digitLookup = asyncHandler(async (req, res) => {
    // Get the digit pressed by the user
    const digitsProvided = req.body.Digits;

    const response = new VoiceResponse();

    switch (digitsProvided) {
        case "1":
        response.say("Connecting you to our representative.");
        const dial = response.dial({
            callerId: process.env.TWILIO_PHONE_NUMBER,
            action: "/turing-tech/record/call",
            method: "POST",
        });
        dial.number(process.env.MY_PHONE);
        res.set("Content-Type", "text/xml");
        res.send(response.toString());
        break;

        case "2":
        response.say("Please leave a message after the beep.");
        response.record({
            action: "/turing-tech/record/recording",
            maxLength: 30,
            playBeep: true,
            finishOnKey: "*",
        });
        res.set("Content-Type", "text/xml");
        res.send(response.toString());
        break;

        default:
        return res.redirect("/turing-tech/welcome");
    }
});

/**
 * Record call details and voice message if there is one.
 *
 * @route POST /turing-tech/record
 */

const recordCall = asyncHandler(async (req, res) => {
    const type = req.params.type;
    const {
        To,
        From,
        CallSid,
        RecordingSid,
        RecordingUrl,
        RecordingDuration,
        ErrorMessage,
        DialBridged
    } = req.body;

    const newRecord = new Record({
        from: From,
        to: To,
        type,
        callSid: CallSid,
        recordingDuration: RecordingDuration,
        recordingUrl: RecordingUrl,
        recordingSid: RecordingSid,
        errorMessage: ErrorMessage,
        dialBridged: DialBridged
    });

    await newRecord.save();

    ErrorMessage || DialBridged === 'false'
        ? res.redirect("/turing-tech/error-msg")
        : res.redirect("/turing-tech/goodbye");
});


/**
 * Get all call details and voice messages.
 *
 * @route POST /turing-tech/record
 */
const getCallRecordings = asyncHandler(async (req, res) => {
    const calls = await Call.find().select("from to status duration callSid");
    const callDetails = await Promise.all(
        calls.map(async (call) => {
            const callRecord = await Record.find({
                callSid: call.callSid,
            }).select("type recordingDuration recordingUrl errorMessage dialBridged");          
            return {
                ...call._doc,
                details: callRecord,
            };
        })
    );  
  
    // Return the list of calls
    return res.status(200).json(callDetails);    
});


/**
 * Error message for if an error occurs,
 *
 * @route GET /turing-tech/error-msg
 */
const errorMsg = asyncHandler(async (req, res) => {
    const response = new VoiceResponse();
    response.say(
        "Our representatives are busy at the moment! " +
        "Please Try Again Later. Goodbye."
    );
    response.hangup();
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
});

/**
 * Say Goodbye message and Hangup,
 *
 * @route GET /turing-tech/goodbye
 */
const goodByeMsg = asyncHandler(async (req, res) => {
    const response = new VoiceResponse();
    response.say(
        "Thank you for calling Turing Technologies! " +
        "Your voice makes a difference. Goodbye."
    );
    response.hangup();
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
});


/**
 * Save Call Details,
 *
 * @route Post /turing-tech/end
 */
const endCall = asyncHandler(async (req, res) => {
    const {
        To,
        From,
        Direction,
        CallSid,
        CallStatus,
        CallerCountry,
        CalledCountry,
        CallDuration
    } = req.body;

    const newCall = new Call({
        from: From,
        to: To,
        status: CallStatus,
        callSid: CallSid,
        direction: Direction,
        duration: CallDuration,
        callerCountry: CallerCountry,
        calledCountry: CalledCountry 
    });

    await newCall.save();

    const response = new VoiceResponse();
    res.set("Content-Type", "text/xml");
    res.send(response.toString());
});


export { welcome, digitLookup, recordCall, errorMsg, goodByeMsg, getCallRecordings, endCall };
