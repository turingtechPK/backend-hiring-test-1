import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {
  private readonly client: Twilio;
  constructor() {
    this.client = new Twilio(
      process.env.SERVICE_TWILIO_KEY_SID,
      process.env.SERVICE_TWILIO_KEY_SECRET,
    );
  }

  async run() {
    await this.client.applications.create({
      voiceMethod: 'POST',
      voiceUrl: 'https://9d50-119-155-229-80.eu.ngrok.io/api/calls',
      friendlyName: 'Phone Me',
    });
    return 'Hello World';
  }
}
