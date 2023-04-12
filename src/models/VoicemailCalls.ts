import mongoose from 'mongoose';

const VoiceMainSchema = new mongoose.Schema({
    CallSid: {
        type: String,
        required: true,
    },
    CallStatus: {
        type: String,
        required: true,
    },
    Digits: {
        type: String,
        required: true,
    },
    RecordingDuration: {
        type: String,
        required: true,
    },
    RecordingSid: {
        type: String,
        required: true,
    },
    RecordingUrl: {
        type: String,
        required: true,
    },
});
VoiceMainSchema.pre('save', async function (next) {
    next();
});
const VoicemailCalls = mongoose.model('voicemail_calls', VoiceMainSchema);

module.exports = VoicemailCalls;
