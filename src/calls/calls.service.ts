import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const VoiceResponse = require('twilio').twiml.VoiceResponse;
import { Repository } from 'typeorm';
import { Call } from './calls.entity';
import { InboudCallDto } from './InboundCallDto';
import { RecordingDto } from './RecordingDto';
import 'dotenv/config';

@Injectable()
export class CallsService {
    constructor(@InjectRepository(Call) private callRepository: Repository<Call>) { }

    //Method to gather phone's keypad input
    gather(twiml) {
      const gatherNode = twiml.gather({ numDigits: 1 });
      gatherNode.say('For customer service representative, press 1. For voicemail, press 2.');
      twiml.hangup();
    }

    async getAllCalls() {
      return await this.callRepository.find();
    }
  
    async receiveCall(inboudCall: InboudCallDto): Promise<string> {      
      const twiml = new VoiceResponse();
  
      //Inserting record only if does not exist already, sometimes webhook is called multiple times.
      let existing = await this.callRepository.findOneBy({call_sid: inboudCall.CallSid});
      if(!existing) {
        await this.callRepository.insert({
          call_sid: inboudCall.CallSid,
          from: inboudCall.From,
          to: inboudCall.To,
          status: inboudCall.CallStatus,
        });
      }
  
      if (inboudCall.Digits) {
        switch (inboudCall.Digits) {
          case '1':
            twiml.dial(process.env.CALLING_NUMBER);
            twiml.say('Goodbye');
            break;
          case '2':
            twiml.say('Hello. Please leave a message after the beep.');
            twiml.record({
              recordingStatusCallbackEvent: ['completed'],
              recordingStatusCallbackMethod: 'POST',
              recordingStatusCallback: process.env.RECORDING_CALLBACK,
            });
            twiml.hangup();
            break;
          default:
            twiml.say("Sorry, I don't understand that choice.");
            twiml.pause();
            this.gather(twiml);
            break;
        }
      } 
      else {
        this.gather(twiml);
      }
  
      return twiml.toString();
    }

    async updateCallStatus(inboudCall: InboudCallDto): Promise<string> {
      const twiml = new VoiceResponse();      

      await this.callRepository.update({call_sid: inboudCall.CallSid}, {
        status: inboudCall.CallStatus,
        duration: inboudCall.CallDuration
      });

      return twiml.toString();
    }
  
    async receiveRecording(recording: RecordingDto): Promise<string> {
      const twiml = new VoiceResponse();
  
      if(recording.RecordingUrl) {
        await this.callRepository.update({call_sid: recording.CallSid}, {
          recording_url: recording.RecordingUrl
        });
      }
  
      return twiml.toString();
    }
  
    async testDb() {
      return process.env.RECORDING_CALLBACK + "-----" + process.env.CALLING_NUMBER;
      const twiml = new VoiceResponse();
      console.log(twiml);
      return true;
      let result = await this.callRepository.insert({
        call_sid: '123abc',
        from: '1234',
        to: '1234',
        duration: 30,
        status: 'in-progress'
      });

      await this.callRepository.update({call_sid: '123abc'}, {
        status: 'Completed',
        recording_url: 'google.com'
      });
  
      console.log("\n\nresult", result);
      console.log("\n\n");
      
      return true;
    }
}
