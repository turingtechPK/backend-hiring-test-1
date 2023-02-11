import { Request, Response } from "express";

const VoiceResponse = require('twilio').twiml.VoiceResponse;

const welcome = function welcome(req: Request, res: Response) {
	const voiceResponse = new VoiceResponse();
	// res.json("yes yes")
	console.log('welcoming');
	const gather = voiceResponse.gather({
		action: '/call/menu',
		numDigits: '1',
		method: 'POST',
	});

	gather.say(
		'Thanks for calling Javed Services,' +
		'Press 1 for Direct Call,' +
		'Press 2 for to Redirect to Voicemail',
		{ voice: "alice", loop: 3 }
	);

	res.type("text/xml").send(voiceResponse.toString());


};

export default welcome;
