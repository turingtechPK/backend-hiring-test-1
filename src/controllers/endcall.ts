import { Request, Response } from "express";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

const endcall = async (req: Request, res: Response) => {
	const response = new VoiceResponse();
	response.say("Thank For Using Javed Services.");
	response.hangup();
	res.type("text/xml").send(response.toString());
};

export default endcall;