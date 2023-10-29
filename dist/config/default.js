"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        forwardingPhoneNumber: process.env.FORWARDING_PHONE_NUMBER,
        createCallUrl: process.env.CREAT_CALL_URL,
        callToNumber: process.env.CALL_TO_NUMBER,
        callFromNumber: process.env.CALL_FROM_NUMBER,
    },
    port: process.env.PORT,
    mongoDbUrl: process.env.MONGO_DB_URL,
});
//# sourceMappingURL=default.js.map