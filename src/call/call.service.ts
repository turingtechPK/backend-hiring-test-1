import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Call } from './schema/call.schema';
import { Model } from 'mongoose';
import { TwilioService } from 'src/twilio/twilio.service';

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<Call>,
    private twilioService: TwilioService,
  ) {}

  async receiveIncomingCall(webhookPayload: Record<string, any>) {
    try {
      // Create a call record in db
      await this.createCallRecord(webhookPayload);

      // Access twilio using webhook and ngrok
      return await this.twilioService.generateVoiceResponse(webhookPayload);
    } catch (error) {
      throw error;
    }
  }

  async selectOption(webhookPayload: Record<string, any>) {
    try {
      // Get the digit pressed by the caller
      const digitPressed = webhookPayload.Digits;

      // Update the action against the call record in the db
      await this.updateCallRecord(webhookPayload.CallSid, {
        action: digitPressed,
      });

      // Pass the pressed digit to twilio webhook
      return await this.twilioService.handleKeyPress(
        digitPressed,
        webhookPayload,
      );
    } catch (error) {
      throw error;
    }
  }

  async handleVoicemail(webhookPayload: Record<string, any>) {
    try {
      // Update the duration and voice mail link in db
      await this.updateCallRecord(webhookPayload.CallSid, {
        duration: webhookPayload.RecordingDuration,
        voiceMailLink: webhookPayload.RecordingUrl,
      });

      // Hang up the call once voice mail is recorded
      return await this.twilioService.callHangup();
    } catch (error) {
      throw error;
    }
  }

  async acivityFeed(offset: number, limit: number) {
    try {
      // Fetch the total count of documents for pagination
      const totalCount = await this.callModel.countDocuments();

      // Fetch all the call records stored in db
      const calls = await this.callModel
        .aggregate([
          {
            $sort: {
              createdAt: -1,
            },
          },
          {
            $addFields: {
              id: '$_id',
            },
          },
          {
            $project: {
              _id: 0,
            },
          },
        ])
        .skip(offset)
        .limit(limit);

      return {
        totalCount,
        calls,
      };
    } catch (error) {
      throw error;
    }
  }

  async createCallRecord(webhookPayload: Record<string, any>) {
    try {
      // Helper function to store call record in db when initiated
      await this.callModel.create({
        accountSid: webhookPayload.AccountSid,
        callSid: webhookPayload.CallSid,
        called: webhookPayload.Called,
        caller: webhookPayload.Caller,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCallRecord(callSid: string, updateParams: Record<string, any>) {
    try {
      // Update the call records according to the selected DTMF tones
      await this.callModel.findOneAndUpdate({ callSid: callSid }, updateParams);
    } catch (error) {
      throw error;
    }
  }
}
