const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default function redirectToWelcome() {
	const twiml = new VoiceResponse();

	twiml.say('Please Select a Valid Option, Returning to The Main Menu', {
		voice: 'alice',
		language: 'en-GB',
	});

	twiml.redirect('/call/welcome');

	return twiml.toString();
}