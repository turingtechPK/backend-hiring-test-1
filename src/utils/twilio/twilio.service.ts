import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
@Injectable()
export class TwilioService {
  private readonly client: Twilio;
  constructor() {
    this.client = new Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
  }

  public sendVoiceResponse(text: string) {
    const twiml = new VoiceResponse();
    twiml.say(text);
    return twiml;
  }

  public handleCall(): VoiceResponse {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      numDigits: 1,
      action: '/api/call/gather',
    });
    gather.say(
      'To Forward Call, press 1. To leave a voicemail, press 2.'
    );

    twiml.redirect('/voice');
    return twiml;
  }

  public forwardCall(twiml: VoiceResponse) {
    const dial = twiml.dial({
      action: `/api/call/end-call`,
    });
    dial.number(process.env.PERSONAL_NUMBER);
    return twiml;
  }

  public recordCall(twiml: VoiceResponse) {
    twiml.record({
      action: '/api/call/end-call',
      finishOnKey: '#',
    });
    return twiml;
  }

  async hangup() {
    const twiml = new VoiceResponse();
    twiml.hangup();
    return twiml;
  }
}
