import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export default function forwardCall() {
	const voiceResponse = new VoiceResponse();

    voiceResponse.say("Redirecting Call");

    voiceResponse.dial("+923409140288");

    return voiceResponse.toString();
};
