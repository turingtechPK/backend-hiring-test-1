import Call from "../models/Call"
import { connect } from 'mongoose';
import ICall from "../models/Interfaces/ICall";

// A Call Module Containing functionalites realted to Call i.e Insertion, Fetching of Data

const add = async (CallData : ICall) => {
	await connect(process.env.MONGO_DB_URI || "");

	const call = new Call(CallData);
	await call.save();
}

const fetchLogs = async () => {
	await connect(process.env.MONGO_DB_URI || "");

	const calls = await Call.find({});
	return calls;
}

export default { add, fetchLogs }

