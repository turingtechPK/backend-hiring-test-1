import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to Twilio service. Please call the twilio number +1 484-729-9629 to test the application.
    To see the list of calls, just append /calls in the url`;
  }
}
