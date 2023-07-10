import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return ('\t\t\tWelcome to Twilio service\nPlease call the twilio number +1 484-729-9629 to test the application');
  }
}
