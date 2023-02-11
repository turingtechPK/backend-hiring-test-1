import { Request, Response } from "express";
import Call from "../modules/Call";


export default async function callLogs(req: Request, res: Response) {
	const calls = await Call.fetchLogs();

	res.json(calls);
};