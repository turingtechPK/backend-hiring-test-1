import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as Twilio from 'twilio';
import { TwilioService } from '../twilio/twilio.service';
import { Call, callDocument } from './call.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<callDocument>,
    private twilioService: TwilioService,
  ) {}

  handleIncomingCall() {
    try {
      const twiml = new Twilio.twiml.VoiceResponse();
      const gather = twiml.gather({
        input: ['dtmf'],
        numDigits: 1,
        action: '/call/gather',
      });
      gather.say(
        { voice: 'woman', language: 'en-US' },
        'Hi thanks for calling. For direct call press 1. For sending a voicemail, press 2.',
      );
      twiml.redirect('/call/incoming');
      return twiml;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async handleGatherInput(digits: string) {
    try {
      const twiml = new Twilio.twiml.VoiceResponse();
      switch (digits) {
        case '1': {
          twiml.say(
            { voice: 'woman', language: 'en-US' },
            'We are redirecting you to the agent',
          );
          const dialNumber = this.twilioService.configService.get<string>(
            'twilio.callToNumber',
          );
          const response = await this.twilioService.dialNumber(dialNumber);
          console.log('Call SID: ', response);
          break;
        }
        case '2': {
          twiml.say(
            { voice: 'woman', language: 'en-US' },
            'Please leave a one minute voicemail after the beep.',
          );
          twiml.record({
            action: '/call/voicemail',
            maxLength: 60,
            playBeep: true,
          });
          break;
        }
        default:
          twiml.say(
            { voice: 'woman', language: 'en-US' },
            "Sorry, I don't understand that choice.",
          );
          twiml.pause();
          twiml.redirect('/call/incoming');
          break;
      }
      return twiml;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async saveVoiceMail(voiceMailData: any) {
    try {
      const twiml = new Twilio.twiml.VoiceResponse();
      twiml.say(
        { voice: 'woman', language: 'en-US' },
        'Thank you for leaving a voicemail.',
      );
      const call = new this.callModel({
        sid: voiceMailData.CallSid,
        duration: voiceMailData.RecordingDuration,
        voiceMailRecordingUrl: voiceMailData.RecordingUrl,
        status: 'completed',
      });
      await call.save();
      return twiml;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCallLogById(id: string) {
    try {
      const callLog = await this.callModel.findById(id);
      if (!callLog) {
        throw new NotFoundException('This is no call log with this Id');
      }
      return callLog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCallLogs() {
    try {
      return await this.callModel.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
