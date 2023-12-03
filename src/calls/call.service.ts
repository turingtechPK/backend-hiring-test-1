import { Injectable } from '@nestjs/common';

import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { TwilioService } from '../third-party/twilio/twilio.service';
import { ActivityFeedService } from '../activity-feed/activity-feed.service';
import { TwilioCallRes, TwilioVoiceRecord } from '../types';

@Injectable()
export class CallService {
  constructor(private readonly twilioService: TwilioService,
    private readonly activityFeedService: ActivityFeedService) { }

  async handleMenuSelection(pressedDigit: string): Promise<string> {
    try {
      //Perform option based operations
      const { callRes, voiceResponse } = await this.twilioService.performMenuOperations(pressedDigit)
      //Log response in DB
      await this.activityFeedService.createActivityFeed(callRes)
      return voiceResponse
    }
    catch (error) {
      throw new Error(error)
    }

  }
  async handleIncomingCall(): Promise<string> {
    try {
      //Method to call when call is made from twilio
      return this.twilioService.triggerIntro()
    }
    catch (error) {
      throw new Error(error)
    }

  }

  async handleVoiceRecording(body: TwilioVoiceRecord): Promise<typeof VoiceResponse> {
    try {
     //Update Call records when response is recieved for voice recording through webhook
      await this.activityFeedService.updateVoiceMessageActivityFeed(body)
      //Triggered when webhook response is recieved after voice recording
      return await this.twilioService.handlePostCallRecord()
    }
    catch (error) {
      throw new Error(error)
    }

  }

  async handleCallLogging(body: TwilioCallRes) {
    try {
      //Update Call records when response is recieved for voice call through webhook
      await this.activityFeedService.updateActivityFeed(body)
    }
    catch (error) {
      throw new Error(error)
    }

  }


}
