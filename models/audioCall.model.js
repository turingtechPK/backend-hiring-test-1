const mongoose = require("mongoose");

const audiCallSchema = new mongoose.Schema(
  {
    sid: { type: String, required: true, unique: true },
    callStatus: { type: String, required: true },
    audioFileLink: { type: String },
    callDuration: { type: Number, required: true },
    from: { type: String, required: true },
  },
  { timestamps: true }
);

const AudioCall = mongoose.model("Call", audiCallSchema);
module.exports = AudioCall;
