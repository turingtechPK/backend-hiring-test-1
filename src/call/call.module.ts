import { Module } from '@nestjs/common';
import { TwilioModule } from 'nestjs-twilio';
import { MongooseModule } from '@nestjs/mongoose';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { Call, CallSchema } from './call.schema';

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: 'AC13299fe2ad3a515f7c7b3fc1375cd3db',
      authToken: '255bb7600fed17cd53a23a2cc7fac6e6',
    }),
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
