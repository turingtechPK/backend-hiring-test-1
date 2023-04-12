const mongoose = require('mongoose');

const calls = mongoose.Schema({
    AccountSid: {
        type: String,
        required: false,
    },
    ApiVersion: {
        type: String,
        required: false,
    },
    CallSid: {
        type: String,
        required: true,
    },
    CallStatus: {
        type: String,
        required: true,
    },
    CallToken: {
        type: String,
        required: false,
    },
    Called: {
        type: String,
        required: false,
    },
    CalledCity: {
        type: String,
        required: false,
    },
    CalledCountry: {
        type: String,
        required: false,
    },
    CalledState: {
        type: String,
        required: false,
    },
    CalledZip: {
        type: String,
        required: false,
    },
    Caller: {
        type: String,
        required: false,
    },
    CallerCity: {
        type: String,
        required: false,
    },
    CallerCountry: {
        type: String,
        required: false,
    },
    CallerState: {
        type: String,
        required: false,
    },
    CallerZip: {
        type: String,
        required: false,
    },
    Direction: {
        type: String,
        required: false,
    },
    From: {
        type: String,
        required: true,
    },
    FromCity: {
        type: String,
        required: false,
    },
    FromCountry: {
        type: String,
        required: true,
    },
    FromState: {
        type: String,
        required: false,
    },
    FromZip: {
        type: String,
        required: false,
    },
    To: {
        type: String,
        required: true,
    },
    ToCity: {
        type: String,
        required: false,
    },
    ToCountry: {
        type: String,
        required: false,
    },
    ToState: {
        type: String,
        required: false,
    },
    ToZip: {
        type: String,
        required: false,
    },
    StirPassportToken: {
        type: String,
        required: false,
    },
    StirVerstat: {
        type: String,
        required: false,
    }
});

const Calls = mongoose.model('calls', calls);

module.exports = Calls;
