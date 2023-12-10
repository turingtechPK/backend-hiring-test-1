"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const callSchema = new mongoose_1.Schema({
    to: { type: String },
    from: { type: String },
    status: { type: String },
    callSid: { type: String },
    duration: { type: String },
    recordingUrl: { type: String },
});
const Call = (0, mongoose_1.model)("Call", callSchema);
exports.default = Call;
