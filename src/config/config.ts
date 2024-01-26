import dotenv from "dotenv";
dotenv.config();

const config = {
  mongodbURL: process.env.MONGODB_URL,
  port: process.env.PORT || 5000,
  phoneNumber: process.env.PHONE_NUMBER,
  callerNumber: process.env.CALLER_NUMBER,
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
};

export default config;
