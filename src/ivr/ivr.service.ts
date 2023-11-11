import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CallLogService } from 'src/calllog/calllog.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class IVRService {
  constructor(
    private readonly callLogService: CallLogService,
    private readonly configService: ConfigService,
  ) {}

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
      [
        '1',
        this.forwardCall(
          this.configService.get<string>('PERSONAL_NUMBER') ?? '',
          this.configService.get<string>('TWILIO_NUMBER') ?? '',
        ),
      ],
      ['2', this.recordCall()],
    ]);

    let actionResponse = null;
    if (menuActions.has(digit)) {
      actionResponse = await menuActions.get(digit);
    } else {
      actionResponse = await this.redirectToIntro();
    }

    return actionResponse;
  }

  private async forwardCall(
    toNumber: string,
    fromNumber: string,
  ): Promise<string> {
    const voiceResponse = new VoiceResponse();
    voiceResponse.say(
      'Forwarding your call. You can talk to the receipient of this number at the end of this sentence.',
    );
    await voiceResponse.dial(toNumber);
    await this.callLogService.createCallLog({
      to: toNumber,
      from: fromNumber,
      sid: '',
      status: '',
      duration: '0',
      recordingUrl: '',
    });
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
    await this.callLogService.createCallLog({
      to: this.configService.get<string>('PERSONAL_NUMBER') ?? '',
      from: this.configService.get<string>('TWILIO_NUMBER') ?? '',
      sid: body.CallSid,
      status: body.CallStatus,
      duration: body.RecordingDuration,
      recordingUrl: body.RecordingUrl,
    });
    return this.redirectToIntro();
  }

  private async redirectToIntro(): Promise<typeof VoiceResponse> {
    const voiceResponse = new VoiceResponse();
    voiceResponse.say('Returning to the main menu');
    voiceResponse.redirect('/ivr/incoming-call');
    return voiceResponse.toString();
  }
}
