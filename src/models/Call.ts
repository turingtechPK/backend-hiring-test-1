import { model, Schema, Model, Document } from 'mongoose';

import ICall from './Interfaces/ICall';

const CallSchema: Schema = new Schema({
		sid: {
			type: String,
			required: true
		},
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
		caller: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true
		},
		duration: {
			type: String,
			required: true,
		},
		voicemail: {
			type: String,
			required: false,
		},
		country: {
			type: String,
			required: true
		}
	},
	{
		collection: "calls",
	});

const Call = model<ICall>('Call', CallSchema);

export default Call;
