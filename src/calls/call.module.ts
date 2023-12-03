import { Module } from '@nestjs/common';

import { ThirdPartyModule } from '../third-party/third-party.module';

import { ConfigModule } from '@/common/config/config.module';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { ActivityFeedModule } from '../activity-feed/activity-feed.module';

@Module({
  imports: [
    ConfigModule, // Load environment variables
    ThirdPartyModule, //Importing third party module having twilio (I like to keep 3rd  party interactions separate)
    ActivityFeedModule
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule { }
