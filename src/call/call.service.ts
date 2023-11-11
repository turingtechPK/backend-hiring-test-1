import { Injectable } from '@nestjs/common';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class CallService {
  constructor(private readonly twilioService: TwilioService) {}

  async voiceCall(): Promise<string> {
    return this.twilioService.createCall();
  }
}
