import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './call.entity';
import { LoggerModule } from '@utils/logger/logger.module';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { TwilioModule } from '@utils/twilio/twilio.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Call]),
    LoggerModule,
    TwilioModule
  ],
  controllers: [CallController],
  exports: [CallService],
  providers: [CallService],
})
export class CallModule {}
