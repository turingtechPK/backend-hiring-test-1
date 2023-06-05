import { TwilioService } from './../twilio/twilio.service';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { CallSchema, Call } from './call.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Twilio } from 'src/twilio/twilio.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Call.name,
        schema: CallSchema,
      },
    ]),
  ],
  controllers: [CallController],
  providers: [CallService, TwilioService],
  exports: [CallService],
})
export class CallModule {}
