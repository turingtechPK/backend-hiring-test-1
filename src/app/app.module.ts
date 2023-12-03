import { Module } from '@nestjs/common';

import { ThirdPartyModule } from '../third-party/third-party.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@/common/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityFeedModule } from '../activity-feed/activity-feed.module';
import { CallModule } from '../calls/call.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    ConfigModule, // Load environment variables
    CallModule, //Load Call Module
    ThirdPartyModule, //Importing third party module having twilio (I like to keep 3rd party interactions separate)
    ActivityFeedModule //Activity Feed module for recording call activities
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
