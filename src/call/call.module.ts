import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { TwilioModule } from '../twilio/twilio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from './call.model';

@Module({
  imports: [
    TwilioModule,
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
  ],
  providers: [CallService],
  controllers: [CallController],
})
export class CallModule {}
