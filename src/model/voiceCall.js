const moduleName = "[voiceCall]",
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const voiceCallSchema = new Schema({
  caller_number: { type: String },
  dialed_number: { type: String},
  call_sid:      {type: String},
  voicemail_url: { type: String }
}, { timestamps : true });

module.exports = mongoose.model('voiceCall', voiceCallSchema);
exports.voiceCallSchema = voiceCallSchema;

console.log( "[voiceCall] model created successfully" );