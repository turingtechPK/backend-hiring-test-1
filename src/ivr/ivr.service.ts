import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class IVRService {
  async intro(): Promise<string> {
    const voiceResponse = new VoiceResponse();
    const gather = voiceResponse.gather({
      action: '/ivr/menu',
      numDigits: '1',
      method: 'POST',
    });

    gather.say(
      { loop: 3 },
      'Thanks for calling the Turing IVR Service. Please press 1 to forward call. Press 2 to record voicemail',
    );

    return voiceResponse.toString();
  }

  async menu(digit: string): Promise<any> {
    const menuActions = new Map<string, any>([
      ['1', this.forwardCall],
      ['2', this.recordCall],
    ]);

    let actionResponse = null;
    if (menuActions.has(digit)) {
      actionResponse = await menuActions.get(digit)();
    } else {
      actionResponse = await this.redirectToIntro();
    }

    return actionResponse;
  }

  private async forwardCall(): Promise<string> {
    const voiceResponse = new VoiceResponse();
    voiceResponse.say(
      'Forwarding your call. You can talk to the receipient of this number at the end of this sentence.',
    );
    await voiceResponse.dial('+923353722626');
    return voiceResponse.toString();
  }

  private async recordCall(): Promise<any> {
    const response = new VoiceResponse();
    await response.record({
      timeout: 300,
      playBeep: true,
      action: '/ivr/recording',
      method: 'POST',
      finishOnKey: '*',
    });
    return response.toString();
  }

  async recordCallback(body: any): Promise<typeof VoiceResponse> {
    console.log('recording', body);
    return this.redirectToIntro();
  }

  private async redirectToIntro(): Promise<typeof VoiceResponse> {
    const voiceResponse = new VoiceResponse();
    voiceResponse.say('Returning to the main menu');
    voiceResponse.redirect('/ivr/incoming-call');
    return voiceResponse.toString();
  }
}
