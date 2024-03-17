import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { Twilio } from 'twilio';

@Module({
  controllers: [TwilioController],
  providers: [
    TwilioService,
    {
      provide: 'Twilio',
      useValue: new Twilio(
        process.env.ACCOUNT_SID,
        process.env.TOKEN,
      )
  }],
})
export class TwilioModule {}
