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

  public processCall(): VoiceResponse {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      numDigits: 1,
      action: '/api/call/input',
    });
    gather.say(
      `Press 1 to forward call.
       Press 2 to leave a voice message.`
    );

    twiml.redirect('/process');
    return twiml;
  }

  public forwardCall(twiml: VoiceResponse) {
    const dial = twiml.dial({
      action: `/api/call/end`,
    });
    dial.number(process.env.PERSONAL_NUMBER);
    return twiml;
  }

  public recordCall(twiml: VoiceResponse) {
    twiml.record({
      action: '/api/call/end',
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
