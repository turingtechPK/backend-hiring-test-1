import mongoose from "mongoose";

const callScheme = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
    },
    status: { type: String },
    callSid: { type: String },
    duration: { type: Number },
    direction: { type: String },
    callerCountry: { type: String },
    calledCountry: { type: String },
  },
  {
    timestamps: true,
  }
);

const Call = mongoose.model("Call", callScheme);
export default Call;