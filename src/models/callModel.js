const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  status: { type: String, required: true },
  duration: { type: Number, required: true },
  audioLink: { type: String },
});

const Call = mongoose.model('Call', callSchema);

module.exports = { Call };
