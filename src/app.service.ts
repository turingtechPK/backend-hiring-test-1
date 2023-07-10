import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'tWelcome to Twilio service. Please call the twilio number +1 484-729-9629 to test the application';
  }
}
