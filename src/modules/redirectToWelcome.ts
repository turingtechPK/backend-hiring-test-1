// const VoiceResponse = require('twilio').twiml.VoiceResponse;
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export default function redirectToWelcome() {
	const voiceResponse = new VoiceResponse();

	voiceResponse.say("Please Select a Valid Option, Returning to The Main Menu");

	voiceResponse.redirect('/call/welcome');

	return voiceResponse.toString();
}