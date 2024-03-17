import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TwilioService } from 'src/twilio/twilio.service';

@Module({
  imports: [TwilioService],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
