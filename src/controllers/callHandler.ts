

import { Request, Response } from "express";
import Call from "../modules/Call";
import Twilio from 'twilio';

const client = Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// called from Twillio API on Status Change, to Push Data in MongoDB

const callHandler = async (req: Request, res: Request) => {
	const { CallSid, CallStatus, CallDuration, From, CallerCountry} = req.body;
	const callDetails = await client
		.calls(CallSid)
		.fetch();
	console.log(callDetails,'yes yes');

	return Call.add({
		sid: CallSid,
		startTime: callDetails.startTime,
		endTime: callDetails.endTime,
		caller: From,
		status: CallStatus,
		duration: CallDuration,
		voicemail: callDetails.subresourceUris.recordings,
		country: CallerCountry
	});
};

export default callHandler;