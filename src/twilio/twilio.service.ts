import * as Twilio from 'twilio';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryInterface } from 'src/models/history.model';
import * as TwilioDTO from './dto';
import * as moment from 'moment';

@Injectable()
export class TwilioService {
  constructor(
    @InjectModel('History')
    private HistoryModel: Model<HistoryInterface>,
  ) {}

  async recieveCall(body: TwilioDTO.RecieveCall) {
    try {
      await new this.HistoryModel({
        sid: body.CallSid,
        status: body.CallStatus,
        to: body.To,
        from: body.From,
      }).save();

      const twiml = new Twilio.twiml.VoiceResponse();

      const gather = twiml.gather({
        action: '/twilio/respond-to-dialpad',
        numDigits: 1,
        method: 'POST',
      });

      gather.say('Press 1 for call forwarding. Press 2 for voice message.');

      return twiml.toString();
    } catch (error) {
      console.error(error);
    }
  }

  async respondToDialpad(body: TwilioDTO.RespondToDialpad) {
    try {
      await this.HistoryModel.findOneAndUpdate(
        { sid: body.CallSid },
        { status: body.CallStatus },
      );

      const twiml = new Twilio.twiml.VoiceResponse();
      switch (body.Digits) {
        case '1':
          twiml.redirect('/twilio/forward-call');
          break;
        case '2':
          twiml.redirect('/twilio/record-voice-message');
          break;
        default:
          twiml.say('Incorrect option. Endingcall Call.');
          twiml.redirect('/twilio/save-call');
      }
      return twiml.toString();
    } catch (error) {
      console.error(error);
    }
  }

  async forwardCall() {
    try {
      const { CALL_FORWARD_NUMBER } = process.env;
      const twiml = new Twilio.twiml.VoiceResponse();

      if (!CALL_FORWARD_NUMBER) {
        twiml.say('There is no call forward number');
        twiml.hangup();
      } else {
        twiml.say('Forwarding call...');
        twiml.dial(CALL_FORWARD_NUMBER);
      }

      twiml.redirect('/twilio/save-call');
      return twiml.toString();
    } catch (error) {
      console.error(error);
    }
  }

  async saveCall(body: TwilioDTO.SaveCall) {
    try {
      const history = await this.HistoryModel.findOne(
        { sid: body.CallSid },
        { createdAt: 1 },
      );

      const twiml = new Twilio.twiml.VoiceResponse();

      twiml.say(' Your call is saved.');
      twiml.hangup();

      await this.HistoryModel.findOneAndUpdate(
        {
          sid: body.CallSid,
        },
        {
          status: 'Finished',
          duration: moment().unix() - moment(history.createdAt).unix(),
        },
      );
      return twiml.toString();
    } catch (error) {
      console.error(error);
      //   res.send(e.message);
    }
  }

  async recordVoiceMessage() {
    try {
      const twiml = new Twilio.twiml.VoiceResponse();

      twiml.say('Record your voice message. press # to end');

      twiml.record({
        playBeep: true,
        finishOnKey: '#',
        action: '/twilio/save-voice-message',
      });

      return twiml.toString();
    } catch (error) {
      console.error(error);
    }
  }

  async saveVoiceMessage(body: TwilioDTO.SaveVoiceMessage) {
    try {
      const twiml = new Twilio.twiml.VoiceResponse();

      twiml.say('Voice message is saved');
      twiml.hangup();

      await this.HistoryModel.findOneAndUpdate(
        {
          sid: body.CallSid,
        },
        {
          voiceMail: true,
          duration: body.RecordingDuration,
          voiceMailUrl: body.RecordingUrl,
          status: 'Finished',
        },
      );

      return twiml.toString();
    } catch (error) {
      console.error(error);
    }
  }

  async fetchHistory(query: TwilioDTO.FetchHistory) {
    try {
      const { limit = 10, offset = 0 } = query;

      const history = await this.HistoryModel.find().skip(offset).limit(limit);
      const rowsCount = await this.HistoryModel.count();

      return {
        success: 1,
        message: 'Success',
        data: {
          rows: history || [],
          rowsCount: rowsCount || 0,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        success: 0,
        message: 'Error occured while processing request',
        data: {
          rows: [],
          rowsCount: 0,
        },
      };
    }
  }
}
