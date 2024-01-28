import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Call } from './entities/call.entity';
import { CallSchema } from './schema/call.schema';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from 'src/twilio/twilio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Call.name, schema: CallSchema, collection: 'calls' },
    ]),
    TwilioModule,
  ],
  controllers: [CallController],
  providers: [CallService],
  exports: [CallService],
})
export class CallModule {}
