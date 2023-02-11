const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default function redirectToVoiceMail() {
	const twiml = new VoiceResponse();

    twiml.say("Please Record Your Message After the Beep.");
    twiml.record();
    return twiml.toString();
};
