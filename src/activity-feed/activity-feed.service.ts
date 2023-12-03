import { Injectable } from '@nestjs/common';
import { ActivityFeed } from './activity-feed.model';
import { ActivityFeedRepository } from './activity-feed.repository';
import { TwilioCallRes, TwilioVoiceRecord } from '../types';

@Injectable()
export class ActivityFeedService {
  constructor(private readonly activityFeedRepository: ActivityFeedRepository) { }

  //To get all call records
  async getAll(): Promise<ActivityFeed[]> {
    try {
      return await this.activityFeedRepository.findAll()
    }
    catch (error) {
      throw new Error(error)
    }
  }
  //To Create Activity Feed
  async createActivityFeed(body: ActivityFeed): Promise<ActivityFeed> {
    try {
      return await this.activityFeedRepository.create(body)
    }
    catch (error) {
      throw new Error(error)
    }
  }
  //For updating the call record after recieving response from webhook
  async updateActivityFeed(body: TwilioCallRes): Promise<ActivityFeed> {
    try {
      const { CallSid, CallStatus, Duration } = body
      const updateBody: Partial<ActivityFeed> = {
        duration: Duration,
        status: CallStatus
      }
      return await this.activityFeedRepository.update(CallSid, updateBody)
    }
    catch (error) {
      throw new Error(error)
    }
  }

  async updateVoiceMessageActivityFeed(body: TwilioVoiceRecord): Promise<ActivityFeed> {
    try {
      const { CallSid, RecordingDuration, CallStatus, RecordingUrl } = body
      const updateBody: Partial<ActivityFeed> = {
        duration: RecordingDuration,
        status: CallStatus,
        voiceMailUrl: RecordingUrl
      }
      return await this.activityFeedRepository.update(CallSid, updateBody)
    }
    catch (error) {
      throw new Error(error)
    }
  }
}
