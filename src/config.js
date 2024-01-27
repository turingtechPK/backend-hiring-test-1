require('dotenv').config();

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const PERSONAL_PHONE_NUMBER = process.env.PERSONAL_PHONE_NUMBER;
const MONGODB_URI = process.env.MONGODB_URI;
console.log("env",process.env.MONGODB_URI)
module.exports = {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  PERSONAL_PHONE_NUMBER,
  MONGODB_URI,
};
