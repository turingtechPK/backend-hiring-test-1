const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config()
const app = express();
const port =  8080;
const {voice_recordings} = require('./models')
const db = require('./models/index')
const functions = require('firebase-functions')


app.use(bodyParser.urlencoded({ extended: true }));


db.sequelize
  .sync({ force: false, alter: false })
  .then(() => console.log("synced"))
  .catch((err) => console.log(err));
// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioClient = twilio(accountSid, authToken);

// Endpoint to handle incoming calls

/**
 * @swagger
 * /voice:
 *   post:
 *     summary: Handle incoming calls
 *     description: Endpoint to handle incoming calls.
 *     responses:
 *       '200':
 *         description: Successful response
 */
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
console.log("_________________it's comgi here")
  const gather = twiml.gather({
    numDigits: 1,
    action: '/handle-key',
    method: 'POST',
  });

  gather.say('Press 1 to forward the call. Press 2 to leave a voicemail.');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Endpoint to handle key press after the initial message

/**
 * @swagger
 * /handle-key:
 *   post:
 *     summary: Handle key press after the initial message
 *     description: Endpoint to handle key press after the initial message.
 *     responses:
 *       '200':
 *         description: Successful response
 */
app.post('/handle-key', (req, res) => {
  const digitPressed = '1';
  const twiml = new twilio.twiml.VoiceResponse();
  if (digitPressed === '1') {
    // Redirect call to personal number using TwiML
    twiml.dial().number(process.env.PERSONAL_PHONE_NUMBER);
  } else if (digitPressed === '2') {
    // Ask for the caller's name before recording voicemail
    twiml.say('Please state your name after the beep.');
    twiml.record({
      action: '/voicemail',
      method: 'POST',
      maxLength: 30,
      transcribe: true, // Optionally enable transcription
    });
  } else {
    // Handle other digits or no input
    twiml.say('Invalid selection. Please try again.');
    twiml.redirect('/voice');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Endpoint to handle voicemail recording


/**
 * @swagger
 * /voicemail:
 *   post:
 *     summary: Handle voicemail recording
 *     description: Endpoint to handle voicemail recording.
 *     responses:
 *       '200':
 *         description: Successful response
 */
app.post('/voicemail', async (req, res) => {
  const voicemailRecordingUrl = req.body.RecordingUrl;
  const callerName = req.body.TranscriptionText || 'Unknown Caller';

  console.log('Caller Name:', callerName);
  console.log('Voicemail Recording URL:', voicemailRecordingUrl);

  // Store voicemail details in PostgreSQL database
  try {
   await voice_recordings.create({voiceUrl: voicemailRecordingUrl, callerName:callerName})
  } catch (err) {
    console.error('Error storing voicemail in the database:', err);
  }

  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Thank you for leaving a voicemail. Goodbye.');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Swagger configuration
const options = {
  swaggerDefinition: {
    info: {
      title: 'Twilio Voice API',
      version: '1.0.0',
      description: 'API documentation for Twilio Voice service',
    },
  },
  apis: ['./app.js'], // Adjust the path based on your project structure
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

exports.api = functions.https.onRequest(app)