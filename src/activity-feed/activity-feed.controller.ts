import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ActivityFeedService } from './activity-feed.service';
import { ActivityFeed } from './activity-feed.model';

@ApiTags('Activity Feed')
@Controller('activity-feed')
export class ActivityFeedController {
  constructor(private readonly activityFeedService: ActivityFeedService) {}

  @Get()
  @ApiOperation({ summary: 'Get all activity feeds', description: 'Retrieves a list of all activity feeds.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation', type: [ActivityFeed] })
  async getAllFeed(): Promise<ActivityFeed[]> {
    return this.activityFeedService.getAll();
  }
}
