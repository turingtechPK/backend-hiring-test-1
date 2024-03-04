import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { TwilioModule } from '../twilio/twilio.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Call]), TwilioModule],
  controllers:[CallsController],
  providers: [CallsService],
})
export class CallsModule {}
