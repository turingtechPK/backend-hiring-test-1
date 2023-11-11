import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) {}

  async createCall(): Promise<string> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const client = new Twilio(accountSid, authToken);
    const response = await client.calls.create({
      url: 'https://66a0-203-124-41-91.ngrok-free.app/ivr/incoming-call',
      to: this.configService.get<string>('PERSONAL_NUMBER') ?? '',
      from: this.configService.get<string>('TWILIO_NUMBER') ?? '',
    });

    return response.sid;
  }
}
