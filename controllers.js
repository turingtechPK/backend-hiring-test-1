// for logic implementation
// to be used by routes

import VoiceResponse from 'twilio/lib/twiml/VoiceResponse.js';
import { agent } from './config.js';
import Call from './models.js';

/**
 * * redirects the call based on given extension, also logs the call
 * Note: Only the call log is saved, call data is not saved
 * @type POST
 * @param {*} req
 * @param {*} res
 * @returns
 */
const processCall = (req, res) => {
  // if auth is implemented
  const user = req.user;

  const { ext } = req.body;
  const twiml = new VoiceResponse();
  switch (ext) {
    case '1':
      // redirected to persoanl-number and call
      const newCall = new Call({
        ext: '1',
        createdAt: new Date().toISOString(),
        user: 'user',
      });
      newCall.save();

      twiml.say(
        { voice: 'alice', language: 'en-GB' },
        "You'll be connected shortly to our HR."
      );
      const dial = twiml.dial({
        action: `/agents/call?agentId=${agent.id}`,
        callerId: agent.phoneNumber,
      });
      dial.number({ url: '/agents/screencall' }, agent.phoneNumber);
      res.send(twiml.toString());
      break;

    case '2':
      // drops a voice-note
      const newNote = new Call({
        ext: '2',
        createdAt: new Date().toISOString(),
        user: 'user',
      });
      newNote.save();

      twiml.say(
        { voice: 'alice', language: 'en-GB' },
        'Please leave a message after the beep'
      );
      twiml.record({
        maxLength: 20,
        transcribeCallback: '/recordings?agentId=' + req.query.agentId,
      });
      twiml.say(
        { voice: 'alice', language: 'en-GB' },
        'Thank you for your message, Goodbye'
      );
      twiml.hangup();
      res.send(twiml.toString());
      break;

    default:
      res.status(404).send({ message: 'Unknown Extension' });
  }
  return;
};

/**
 * Get the list of call logs
 * @type GET
 * @param {*} req
 * @param {*} res
 * @returns list of call logs
 */
const getCalls = async (req, res) => {
  try {
    const result = await Call.find();
    if (result) return res.status(200).send({ result });
    return res.status(404).send({ message: 'Data not found' });
  } catch (error) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const callController = {
  processCall,
  getCalls,
};

export default callController;
