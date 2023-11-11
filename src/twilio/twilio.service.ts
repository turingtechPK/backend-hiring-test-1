import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getBaseUrl } from 'src/util';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  constructor(private readonly configService: ConfigService) {}

  async createCall(): Promise<string> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const client = new Twilio(accountSid, authToken);
    const response = await client.calls.create({
      url: `${getBaseUrl()}/ivr/incoming-call`,
      to: this.configService.get<string>('PERSONAL_NUMBER') ?? '',
      from: this.configService.get<string>('TWILIO_NUMBER') ?? '',
    });

    return response.sid;
  }
}
