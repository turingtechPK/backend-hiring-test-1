import Call from "../models/Call"
import { connect } from 'mongoose';
import ICall from "../models/Interfaces/ICall";

const add = async (CallData : ICall) => {
	await connect(process.env.MONGO_DB_URI || "");

	const call = new Call(CallData);
	await call.save();
}

export default { add }

