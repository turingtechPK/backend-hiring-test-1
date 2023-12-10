import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioClient = twilio("AC54bbb94d9b3e88e2071ecdbdbf9d45bf", "8dcc5e37a53bde7f895a986e476cd955")

export default twilioClient