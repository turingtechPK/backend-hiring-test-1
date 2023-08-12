import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@utils/logger/logger.module';
import { TwilioService } from './twilio.service';

@Module({
  imports: [LoggerModule],
  exports: [TwilioService],
  providers: [TwilioService],
})
export class TwilioModule {}
