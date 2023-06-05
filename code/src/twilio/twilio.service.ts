import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor(private readonly configService: ConfigService) {
    this.client = new Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  getTwilioClient() {
    return this.client;
  }

  receiveIncomingCall() {
    const twiml = new VoiceResponse();
    const helper = twiml.gather({
      numDigits: 1,
      action: '/calls/handleCall',
    });

    helper.say(
      'Welcome to Turing Tech. For Calling your personal number, press 1. For Recording your message, press 2.',
    );
    return twiml.toString();
  }

  handleIncomingCall(req) {
    const twiml = new VoiceResponse();
    const digits = req.body.Digits;

    if (digits == 1) {
      const dial = twiml.dial(this.configService.get('MY_PHONE_NUMBER'));
    } else if (digits == 2) {
      // Use <Record> to record the caller's message
      twiml.record({
        action: '/calls/voiceMail',
        method: 'POST',
      });
      // // End the call with <Hangup>
      // twiml.hangup();
    } else {
      twiml.say("Sorry, I don't understand that choice.");
      twiml.redirect('/calls/handleCall');
    }

    return twiml.toString();
  }

  endVoiceMailRecoring() {
    const twiml = new VoiceResponse();
    twiml.say('Thank you. Your voice mail has been recorded.');
    twiml.hangup();
    return twiml.toString();
  }

  async getCallDetails(callSid) {
    return await this.client.calls(callSid).fetch();
  }
}
