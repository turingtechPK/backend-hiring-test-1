import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

// A Simple Module That Redirects to VoiceMail

export default function redirectToVoiceMail() {
	const voiceResponse = new VoiceResponse();

    voiceResponse.say("Please Record Your Message After the Beep.");

    voiceResponse.record();

    return voiceResponse.toString();
};
