import mongoose from 'mongoose';

const ForwadedCallsSchema = new mongoose.Schema({
    CallSid: {
        type: String,
        required: true,
    },
    CallStatus: {
        type: String,
        required: true,
    },
});
ForwadedCallsSchema.pre('save', async function (next) {
    next();
});
const ForwardedCalls = mongoose.model('forwarded_call', ForwadedCallsSchema);

module.exports = ForwardedCalls;
