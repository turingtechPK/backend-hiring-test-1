import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Records } from './records.schema';
import { Model } from 'mongoose';
import * as Twilio from 'twilio';

@Injectable()
export class CallsService {
  constructor(
    @InjectModel('Record') private readonly recordsModel: Model<Records>,
  ) {}

  async getAllRecords(): Promise<Records[]> {
    const records: Records[] = await this.recordsModel.find().sort();
    return records;
  }

  /////////////////intial greetings when the user calls/////////////////////
  async setup(body) {
    try {
      const response = new Twilio.twiml.VoiceResponse();
      const newRecord = await new this.recordsModel({
        callsid: body.CallSid,
        status: body.CallStatus,
        to: body.To,
        from: body.From,
      }).save();
      const gather = response.gather({
        numDigits: 1,
        action: '/calls/inbound',
        method: 'POST',
      });
      gather.say(
        `Thanks for calling Ehtisham ali test.press 1 for call forwarding.Press 2 for recording a message`,
      );

      return response.toString();
    } catch (error) {
      console.log(error);
    }
  }

  //////////////////////inbound call options for selection by user///////////////////////
  async inbound(body) {
    try {
      const call = await this.recordsModel.findOneAndUpdate(
        { callsid: body.CallSid },
        { status: body.CallStatus },
      );
      const response = new Twilio.twiml.VoiceResponse();

      switch (body.Digits) {
        case '1':
          response.say(' Forwarding call');
          response.redirect('/calls/forwarding');
          break;
        case '2':
          response.say(' Voice message is selected');
          response.redirect('/calls/recordVoice');
          break;
        default:
          response.say('Incorrect Option');
          response.redirect('/calls/saveCall');
      }

      //res.type("text/xml");
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////if the user press the 1 then this function triggers/////
  async callForwarding() {
    try {
      let phone_number: any = process.env.MY_NUMBER;
      let options: any = {
        action: '/calls/saveCall',
        method: 'POST',
      };
      const response = new Twilio.twiml.VoiceResponse();
      //   console.log(body);
      response.say('Dialing.');
      response.dial(phone_number, options);
      // res.redirect(307, "/calls/saveCall");

      return response.toString();
    } catch (error) {
      console.log(error);
    }
  }

  ////////////////////////after call ends this functions stores it in DB//////////////////
  async saveCall(body) {
    try {
      const response = new Twilio.twiml.VoiceResponse();
      console.log(body);
      response.say(' Thankyou . Call record added to DB');
      response.hangup();
      const update = {
        status: 'Completed',
        method: 'call',
        FromCountry: body.FromCountry,
        ToCountry: body.ToCountry,
        duration: body.DialCallDuration || 0,
      };
      const call = await this.recordsModel.findOneAndUpdate(
        { callsid: body.CallSid },
        { update },
      );
      call.save();

      return response.toString();
    } catch (error) {
      console.log(error);
    }
  }

  /////////////////for choosing voice by user, this function records the voice////////////
  async recordVoice() {
    try {
      const response = new Twilio.twiml.VoiceResponse();
      response.say(
        'Please leave a message at the beep.\nPress the star key when finished.',
      );
      response.record({
        action: '/calls/saveVoice',
        method: 'POST',
        maxLength: 3,
        finishOnKey: '*',
      });

      return response.toString();
    } catch (error) {
      console.log(error);
    }
  }

  async saveVoice(body) {
    try {
      const response = new Twilio.twiml.VoiceResponse();
      response.say('Your VoiceMail is saved');
      response.hangup();
      const call = await this.recordsModel.findOneAndUpdate(
        { callsid: body.CallSid },
        {
          status: 'Completed',
          method: 'voiceNote',
          FromCountry: body.FromCountry,
          ToCountry: body.ToCountry,
          RecordingUrl: body.RecordingUrl,
          duration: body.RecordingDuration,
        },
      );
      call.save();
      return response.toString();
    } catch (error) {
      console.log(error);
    }
  }
}
