import mongoose from "mongoose";

const CallSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true },
  duration: { type: Number, required: true },
  status: { type: String, required: true },
  from: { type: String, required: true },
  recordingUrl: { type: String },
  createdAt: { type: Date, required: true },
});

export const Call = mongoose.model("Call", CallSchema);
