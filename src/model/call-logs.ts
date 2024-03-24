import mongoose from "mongoose";

const CallLogsSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  sid: {
    type: String,
    required: true,
  },
  recordingUrl: {
    type: String,
    required: false,
  },
  digitPressed: {
    type: String,
    required: false,
  },
  startTime: {
    type: Date,
  },
});

module.exports = mongoose.model("CallLogs", CallLogsSchema, "CallLogs");
