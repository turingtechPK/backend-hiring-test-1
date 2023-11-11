import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  async createCall(): Promise<string> {
    const accountSid = 'AC6e220d5a88c0514e91abb1bad06c6373';
    const authToken = 'c55c7baf0d1bfe351a9499db0e77df72';

    const client = new Twilio(accountSid, authToken);
    const response = await client.calls.create({
      url: 'https://66a0-203-124-41-91.ngrok-free.app/ivr/incoming-call',
      to: '+923353722626',
      from: '+13345131347',
    });

    return response.sid;
  }
}
