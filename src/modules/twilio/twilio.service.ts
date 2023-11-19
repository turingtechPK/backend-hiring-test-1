import { BadRequestException, Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {

  client: Twilio.Twilio;

  constructor() {
    this.client = new Twilio.Twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN,
      {
        autoRetry: true,
        maxRetries: 3,
        logLevel: 'debug',
      },
    );
  }

  async dialNumber(to: string) {
    try {
      return await this.client.calls.create({
        url: process.env.TWILIO_CALL_URL,
        to,
        from: process.env.TWILIO_CALL_FROM,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}