import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './call.entity';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { TwilioModule } from '@utils/twilio/twilio.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Call]),
    TwilioModule
  ],
  controllers: [CallController],
  exports: [CallService],
  providers: [CallService],
})
export class CallModule {}
