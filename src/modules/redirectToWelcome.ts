import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

// A Simple Module That Redirects to the Welcome Page Upon Invalid Response

export default function redirectToWelcome() {
	const voiceResponse = new VoiceResponse();

	voiceResponse.say("Please Select a Valid Option, Returning to The Main Menu");

	voiceResponse.redirect('/call/welcome');

	return voiceResponse.toString();
}