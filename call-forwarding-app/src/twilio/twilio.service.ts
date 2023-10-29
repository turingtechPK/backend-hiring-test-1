import { BadRequestException, Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio.Twilio;
  constructor(public configService: ConfigService) {
    this.twilioClient = new Twilio.Twilio(
      this.configService.get<string>('twilio.accountSid'),
      this.configService.get<string>('twilio.authToken'),
      {
        autoRetry: true,
        maxRetries: 3,
        logLevel: 'debug',
      },
    );
  }

  async dialNumber(to: string) {
    try {
      const response = await this.twilioClient.calls.create({
        url: this.configService.get<string>('twilio.createCallUrl'),
        to: this.configService.get<string>('twilio.callToNumber'),
        from: this.configService.get<string>('twilio.callFromNumber'),
      });
      return response.sid;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async showCallLogs() {
    try {
      return await this.twilioClient.calls.list({ limit: 20 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
