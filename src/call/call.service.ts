import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Call, CallDocumentType } from './call.schema';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocumentType>,
  ) {}

  /**
   * Service for getting all sorted call logs
   * */

  async callLog() {
    try {
      const calls = await this.callModel.find().sort({ createdAt: -1 });
      return calls;
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }

  /**
   * Service for handling incoming call
   * */
  async incomingCall(body) {
    try {
      const call = new this.callModel({
        sid: body.CallSid,
        to: body.To,
        from: body.From,
        status: body.CallStatus,
      });
      await call.save();
      const twiml = new VoiceResponse();
      const gather = twiml.gather({
        action: '/call/menu',
        numDigits: 1,
        method: 'POST',
      });

      gather.say(
        { voice: 'alice', loop: 2 },
        'Welcome to Omar`s IRV System.Please press 1 for call forwarding and press 2 for leaving a voice mail.',
      );
      return twiml.toString();
    } catch (e) {
      console.log('incoming error', e.message);
      return {
        error: e.message,
      };
    }
  }

  /**
   * Service for provide call options to user.
   * */
  async menu(body) {
    try {
      const twiml = new VoiceResponse();
      await this.callModel.findOneAndUpdate(
        {
          sid: body.CallSid,
        },
        {
          status: body.CallStatus,
        },
      );

      switch (body.Digits) {
        case '1':
          twiml.redirect('/call/forwarding');
          break;
        case '2':
          twiml.redirect('/call/voiceMail');
          break;
        default:
          twiml.say(
            { voice: 'alice' },
            'Incorrect option selected,Please try again with correct option.',
          );
          twiml.redirect('/call/save');
      }
      return twiml.toString();
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }

  /**
   * Service for call forwarding to personal number
   * */
  async callForwarding() {
    try {
      const twiml = new VoiceResponse();
      twiml.dial('+923056113288');
      twiml.redirect('/call/save');
      return twiml.toString();
    } catch (e) {
      console.log('forward error', e);
      return {
        error: e.message,
      };
    }
  }

  /**
   * Service for call details saving to DB.
   * */
  async saveNormalCall(body) {
    try {
      const twiml = new VoiceResponse();
      twiml.say({ voice: 'alice' }, 'Your Call is saved.');
      twiml.hangup();
      const update = {
        status: 'Completed',
        FromCountry: body.FromCountry,
        ToCountry: body.ToCountry,
      };
      await this.callModel.findOneAndUpdate(
        {
          sid: body.CallSid,
        },
        {
          update,
        },
      );
      return twiml.toString();
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }

  async voiceMailing() {
    try {
      const twiml = new VoiceResponse();
      twiml.say(
        { voice: 'alice' },
        'Your voice will be recorded,please start speaking after the beep and press * on finish.',
      );

      twiml.record({
        playBeep: true,
        finishOnKey: '*',
        action: '/call/saveVoiceMail',
      });
      return twiml.toString();
    } catch (e) {
      console.log(e.message);
      return {
        error: e.message,
      };
    }
  }

  /**
   * Service for saving voice mails to DB.
   * */
  async saveVoiceMail(body) {
    try {
      const twiml = new VoiceResponse();
      twiml.say({ voice: 'alice' }, 'Your VoiceMail is saved successfully.');
      twiml.hangup();
      await this.callModel.findOneAndUpdate(
        {
          sid: body.CallSid,
        },
        {
          voiceMail: true,
          voiceMailURL: body.RecordingUrl,
          status: 'Completed',
        },
      );
      return twiml.toString();
    } catch (e) {
      console.log('saveVoiceMail', e.message);
      return {
        error: e.message,
      };
    }
  }
}
