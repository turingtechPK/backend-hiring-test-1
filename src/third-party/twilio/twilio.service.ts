import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Twilio } from 'twilio';

import { ConfigService } from '@/common/config/config.service';

import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { CallInstanceRes } from '@/src/types';

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) { }
  //Private variables from ENV since these are sensitive
  private readonly APP_URL = this.configService.get('BASE_URL')
  private readonly twilioSid = this.configService.get('TWILIO_SID');
  private readonly twilioAuthToken = this.configService.get('TWILIO_AUTH');
  private readonly personalPhoneNumber = this.configService.get('PERSONAL_PNO');
  private readonly companyPhoneNumber = this.configService.get('TWILIO_PNO');

  async createCallInstance(from: string, to: string): Promise<CallInstanceRes> {
    try {
      // Creates a call instance and sets the endpoint to call for logging voice call
      const client = new Twilio(this.twilioSid, this.twilioAuthToken);
      const response = await client.calls.create({
        to,
        from,
        url: "http://demo.twilio.com/docs/voice.xml",
        statusCallback: `${this.APP_URL}/call/log`,
        statusCallbackMethod: "POST"
      });
      return response;
    }
    catch (error) {
      throw new Error(error)
    }

  }

  async triggerIntro(): Promise<string> {
    try {
      const voiceResponse = new VoiceResponse();
      //Setup endpoint to call when user interacts
      const gather = voiceResponse.gather({
        action: `${this.APP_URL}/call/menu-selection`,
        numDigits: 1,
        method: 'POST',
      });

      gather.say(
        { loop: 2 },
        'Please press 1 to forward call. Press 2 to record voicemail',
      );

      return voiceResponse.toString();
    } catch (error) {
      throw new InternalServerErrorException('Could not connect to IVR')
    }
  }


  async performMenuOperations(digit: string): Promise<{ voiceResponse: string, callRes: CallInstanceRes }> {
    try {
      const callRes = await this.createCallInstance(this.companyPhoneNumber, this.personalPhoneNumber)
      switch (digit) {
        //When user presses 1
        case '1':
          const forwardedCallResponse = await this.forwardCall()
          return { callRes, voiceResponse: forwardedCallResponse }
        //When user presses 2
        case '2':
          const recordedCallResponse = await this.recordCall()
          return { callRes, voiceResponse: recordedCallResponse }
        default:
          //When wrong option is selected
          const redirectCallResponse = await this.redirectToIntro()
          return { callRes, voiceResponse: redirectCallResponse }
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }

  private async forwardCall(): Promise<string> {
    try {
      const voiceResponse = new VoiceResponse();
      //Response when user presses 2
      voiceResponse.say(
        'Forwarding your call. You can talk to the receipient of this number at the end of this sentence.',
      );

      return voiceResponse.toString();
    }
    catch (error) {
      throw new Error(error)
    }

  }

  private async recordCall(): Promise<string> {
    try {
      //Configures call record settings
      const voiceResponse = new VoiceResponse();
      voiceResponse.record({
        timeout: 10,
        playBeep: true,
        action: `${this.APP_URL}/call/record`,
        method: 'POST',
        finishOnKey: '*',
      });

      return voiceResponse.toString();
    }
    catch (error) {
      throw new Error(error)
    }

  }

  async handlePostCallRecord(): Promise<any> {
    try {
      const voiceResponse = new VoiceResponse();
      //Response after call recording
      voiceResponse.say('Thank you for leaving a message. Goodbye.');
      return voiceResponse.toString();
    }
    catch (error) {
      throw new Error(error)
    }

  }

  redirectToIntro(): Promise<string> {
    try {
      const voiceResponse = new VoiceResponse();
      //Configuration to redirect back to main menu
      voiceResponse.say('Returning to the main menu');
      voiceResponse.redirect(`${this.APP_URL}/call/incoming`);
      return voiceResponse.toString();
    }
    catch (error) {
      throw new Error(error)
    }
  }
}
