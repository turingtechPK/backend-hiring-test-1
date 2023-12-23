import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema(
  {

    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    callSid: { type: String },
    recordingDuration: { type: Number },
    errorMessage: { type: String },
    recordingUrl: { 
        type: String,
    },
    recordingSid: { 
      type: String,
    },
    dialBridged: { 
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("record", recordingSchema);
export default Record;