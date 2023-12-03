import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityFeed, ActivityFeedModel } from './activity-feed.model';
import { ActivityFeedRepository } from './activity-feed.repository';
import { ActivityFeedService } from './activity-feed.service';
import { ActivityFeedController } from './activity-feed.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: ActivityFeed.name, schema: ActivityFeedModel, collection: 'activity-feed' }])],
    controllers: [ActivityFeedController],
    providers: [ActivityFeedService, ActivityFeedRepository],
    exports: [ActivityFeedService]
})
export class ActivityFeedModule { }