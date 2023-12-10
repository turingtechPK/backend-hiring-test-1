import { Document, model, Schema } from "mongoose";

export interface Call extends Document {
  to: string;
  from: string;
  status: string;
  callSid: string;
  recordingUrl: string;
  duration: string;
}

const callSchema: Schema = new Schema({
  to: { type: String },
  from: { type: String },
  status: { type: String },
  callSid: { type: String },
  duration: { type: String },
  recordingUrl: { type: String },
});

const Call = model<Call>("Call", callSchema);

export default Call;
