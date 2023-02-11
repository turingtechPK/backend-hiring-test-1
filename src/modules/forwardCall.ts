import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

// A Simple Module That Redirects to Specified Phone Number

export default function forwardCall() {
	const voiceResponse = new VoiceResponse();

    voiceResponse.say("Redirecting Call");

    voiceResponse.dial("00923409140288");

    return voiceResponse.toString();
};
