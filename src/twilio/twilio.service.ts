import { Injectable, Inject } from '@nestjs/common';
import { Twilio } from 'twilio';
const VoiceResponse = require('twilio').twiml.VoiceResponse;


@Injectable()
export class TwilioService {
  constructor(@Inject('Twilio') private readonly twilioService: Twilio) {}
  async receiveCall() {
    const twiml = new VoiceResponse();
    const gather = await twiml.gather({
      action: '/select-option',
      numDigits: '1',
      method: 'POST',
    });

    gather.say(`Hello and Welcome to Shahmeer's IVR. For recording a voice mail please press 1 if you want to talk to a sales representative.
                Please press 2 if you wish to leave a voicemail`, 
                { loop: 3, voice: 'Polly.Amy'});
    
    // twiml.redirect('/recieving-call');
    return twiml.toString();
  }

  async getOption(payload) {
    const twiml = new VoiceResponse();
    const digit = payload.body.Digits;

    if(digit == '1') {
      this.callOnANumber()
    } else if (digit == '2') {
      await this.recordVoiceMail()
    } else {
      await twiml.say("That is an invalid digit");
      await this.receiveCall();
    }
    return twiml.toString()
  }

  async recordVoiceMail() {
    const twiml = new VoiceResponse();
    await twiml.say('Please leave a message at the beep.\nPress the star key when finished.');
    await twiml.record({
        action: '/handle-voicemail',
        method: 'POST',
        maxLength: 20,
        playBeep: true,
        finishOnKey: '*'
    });
    await twiml.say('I did not receive a recording');
    return twiml.toString()
  }

  async callOnANumber() {
    const twiml = new VoiceResponse();
    await twiml.dial(process.env.PHONE_NUMBER);
    return twiml.toString();
  }

  hangUp() {
    const twiml = new VoiceResponse();
    twiml.hangup();
  }
}
