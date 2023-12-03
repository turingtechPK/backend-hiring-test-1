import { Module } from '@nestjs/common';

import { TwilioService } from './twilio/twilio.service';

import { ConfigModule } from '@/common/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [TwilioService],
  exports: [TwilioService],
})
export class ThirdPartyModule {}
