import { TwilioService } from './../twilio/twilio.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Call } from './call.schema';
import { Model } from 'mongoose';

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<Call>,
    private twilioService: TwilioService,
  ) {}

  async getAll() {
    const calls = await this.callModel.find();
    return {
      result: calls.length,
      calls,
    };
  }

  async handleIncomingCall(req) {
    console.log('req.body', req.body);
    this.twilioService.getCallDetails(req.body.CallSid).then(
      async (call) =>
        await this.callModel.create({
          id: call.sid,
          status: call.status,
          callFrom: call.from,
          callTo: call.to,
          duration: call.duration,
          startedAt: call.startTime,
          finishedAt: call.endTime,
          // recording_url: '',
        }),
    );
    return this.twilioService.handleIncomingCall(req);
  }

  async handleVoiceMail(req) {
    console.log('req.body', req.body);
    await this.callModel
      .findOneAndUpdate(
        {
          id: req.body.CallSid,
        },
        {
          $set: {
            recording_url: req.body.RecordingUrl,
          },
        },
        {
          new: true,
        },
      )
      .exec();
    return this.twilioService.endVoiceMailRecoring();
  }

  async getOne(id: any) {
    const calls = await this.callModel.findById(id);
    return calls;
  }

  async updateOne(id: any, body: any) {
    const calls = await this.callModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      },
    );
    return calls;
  }
}
