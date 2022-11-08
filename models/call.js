const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  duration: { type: Number, required: true }, // in seconds
  fromPhoneNumber: { type: String, required: true },
  audioFileUrl: { type: String },
});

const Call = mongoose.model("Call", callSchema);
module.exports = Call;
