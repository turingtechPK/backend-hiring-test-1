import { Request, Response } from "express";
import forwardCall from "../modules/forwardCall";
import redirectToVoiceMail from "../modules/redirectToVoiceMail";
import redirectToWelcome from "../modules/redirectToWelcome";

export default function menu(req: Request, res: Response) {
	const digit: String = req.body.Digits;

	if(digit === '1'){
		res.type("text/xml").send(forwardCall());
	} else if(digit === '2'){
		res.type("text/xml").send(redirectToVoiceMail());
	} else {
		res.type("text/xml").send(redirectToWelcome());
	}
};