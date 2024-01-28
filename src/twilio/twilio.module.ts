import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { Twilio } from 'twilio';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TwilioController],
  providers: [
    TwilioService,
    {
      provide: 'Twilio',
      useValue: new Twilio(
        process.env.TWILIO_ACCOUNT_ID,
        process.env.TWILIO_AUTH_TOKEN,
      ),
    },
  ],
  exports: [TwilioService],
})
export class TwilioModule {}
