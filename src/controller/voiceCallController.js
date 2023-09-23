const twilio = require('twilio');
const client = twilio('AC7a94ddb6bb000366dad07d1fa95beeff', '4e6488989032365a366e99f47637c3c0');
const voiceCallModel = require('../model/voiceCall');
const voice = require('../routes/voice');


exports.incomingCall = async (req, res) => {

  const twiml = new twilio.twiml.VoiceResponse();

  // Get the user's input from the request
  const userInput = req.body.Digits;
  if (userInput === '1') {
    // If the user pressed 1, forward the call to another number
    client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+923405155445", //my personal number
      from: "+12568587423", // twilio provided number
    })
      .then((call) => {
        const body = {
          caller_number: call.from, // to store information in database regarding call
          dialed_number: call.to,
          call_sid: call.sid,
        };
        const voice = new voiceCallModel(body);
        voice.save()
          .then(() => {
            console.log('Call details saved to MongoDB:', body);
          })
          .catch((error) => {
            console.error('Error saving call details to MongoDB:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating call:', error);
      });;
  } else if (userInput === '2') {
    // for voice mail
    twiml.say('Please leave a voicemail after the beep.');
    twiml.record({
      action: '/voiceMail',
      maxLength: 60, // Set the maximum recording length (in seconds)
    });
  } else {
    // If the user pressed any other digit or no input, replay the menu
    twiml.gather({
      numDigits: 1,
      action: '/voiceCall',
    }, (gatherNode) => {
      gatherNode.say('Welcome to the IVR menu. Press 1 to forward your call or 2 to leave a voicemail.');
    });
  }

  res.type('text/xml');
  res.send(twiml.toString());
};

exports.handleVoiceMail = (req, res) => {

  const voicemail = req.body.RecordingUrl;
  let body = {
    voicemailUrl: voicemail
  }
  voice = new voiceCallModel(body);
  voice.save();

};
