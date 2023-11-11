import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { TwilioModule } from 'src/twilio/twilio.module';

@Module({
  imports: [TwilioModule],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
