export default () => ({
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://postgres:CFbEe6abEDDg66Ff6B3DCDbC3*5AFf-2@roundhouse.proxy.rlwy.net:53660/railway',
  PERSONAL_NUMBER: process.env.PERSONAL_NUMBER,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
});
