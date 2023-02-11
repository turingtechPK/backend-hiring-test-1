const VoiceResponse = require('twilio').twiml.VoiceResponse;

export default function forwardCall() {
	const response = new VoiceResponse();

    response.say("Redirecting Call");
    response.dial("+923409140288", {
		action: "/call/endcall",
	});
    return response.toString();
};
