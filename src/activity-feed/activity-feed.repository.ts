import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivityFeed } from './activity-feed.model';

//Separate repository file for database interactions. Makes Migrations easy
export class ActivityFeedRepository {
    constructor(
        @InjectModel(ActivityFeed.name)
        private ActivityFeedModel: Model<ActivityFeed>,
    ) { }

    async create(
        createActivityFeedDto: ActivityFeed,
    ): Promise<ActivityFeed> {
        return await this.ActivityFeedModel.create(createActivityFeedDto);
    }

    async findAll(): Promise<ActivityFeed[]> {
        return await this.ActivityFeedModel.find().exec();
    }

    async findOne(sid: ActivityFeed['sid']): Promise<ActivityFeed> {
        return await this.ActivityFeedModel.findById(sid).exec();
    }

    async update(
        sid: ActivityFeed['sid'],
        updateActivityFeedDto: Partial<ActivityFeed>,
    ): Promise<ActivityFeed> {
        return await this.ActivityFeedModel.findOneAndUpdate(
            { sid },
            updateActivityFeedDto,
            { new: true },
        ).exec();
    }

}