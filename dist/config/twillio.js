"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioClient = (0, twilio_1.default)("AC54bbb94d9b3e88e2071ecdbdbf9d45bf", "8dcc5e37a53bde7f895a986e476cd955");
exports.default = twilioClient;
