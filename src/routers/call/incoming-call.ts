// Set up environment variables
require('dotenv').config();
const ForwardedCalls = require('../../models/ForwardedCalls')
const VoicemailCalls = require('../../models/VoicemailCalls')
const Calls = require('../../models/Calls')
const express = require('express');
const router = express.Router();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

// Auth keys from env
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const ngrokURL = 'https://backend-hiring-test-1-production.up.railway.app';
const forwardNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = require('twilio')(accountSid, authToken);


interface ReqType {
    body: {
        Digits: string
        CallSid: string
    },
    query: {
        RecordingUrl: string
    }
}
interface ResTypes {
    type: (c: string) => void;
    send: (c: any) => void;
    status: any
}

router.post('/call/incoming_call', async (req: ReqType, res: ResTypes) => {

    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();

    let calls = new Calls(req.body);
    await calls.save();

    /** helper function to set up a <Gather> */
    function gather() {
        // Use the <Gather> verb to collect user input
        const gather = twiml.gather({ numDigits: 1 });
        gather.say('To forward call to another phone number, press 1. For voicemail, press 2.');

        // If the user doesn't enter input, loop
        twiml.redirect('/call/incoming_call');
    }
    // If the user entered digits, process their request
    if (req.body.Digits) {

        switch (req.body.Digits) {
            case '1':
                //Forward call
                twiml.say('Your call is being forwaded');
                twiml.dial({
                    action: ngrokURL + '/call/forward_call',
                    method: 'GET'
                }, forwardNumber);
                break;
            case '2':
                //Record a voicemail
                twiml.say('Please leave a message at the beep.\nPress the star key when finished.');
                twiml.record({
                    action: ngrokURL + '/call/handle_recording',
                    method: 'GET',
                    maxLength: 20,
                    finishOnKey: '*'
                });
                break;
            default:
                //Unknown key
                twiml.say("Sorry, I don't understand that choice.");
                twiml.pause();
                gather();
                break;
        }

    } else {
        // If no input was sent, use the <Gather> verb to collect user input
        gather();
    }
    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());
});

//Rounte to handle the voicemail
router.get('/call/forward_call', async (req: ReqType, res: ResTypes) => {
    try {
        let forwarded_calls = new ForwardedCalls(req.query);
        await forwarded_calls.save();
        let status = 'success';
        res.status(201).send({ forwarded_calls, status });
    } catch (e) {
        res.status(400).send(e)
    }
});

//Rounte ro handle the voicemail
router.get('/call/handle_recording', async (req: ReqType, res: ResTypes) => {
    try {
        let voicemail_calls = new VoicemailCalls(req.query);
        await voicemail_calls.save();
        let status = 'success';
        res.status(201).send({ voicemail_calls, status });
    } catch (e) {
        res.status(400).send(e)
    }
    // console.log(req.query);

});
module.exports = router;
