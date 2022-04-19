import { Injectable } from '@nestjs/common';
import { twiml } from 'twilio'
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Call, CallDocument } from "./schemas/call.schema";
import { CallResponse } from './interfaces/call-response.interface'
import { config } from './config'

import { FORWARDING_OPTIONS, VOICE_MAIL_STATUS, AGENT_STATUS } from './constants'


@Injectable()
export class AppService {
  VoiceResponse: any
  BasePath: string

  constructor(@InjectModel(Call.name) private callModel: Model<CallDocument>) {
    this.BasePath = '/'
    this.VoiceResponse = twiml.VoiceResponse
  }
  
  /**
   * Method to get list of call logs
   */
  async getCalls(): Promise<CallResponse> {
    const response: CallResponse = {
      data: [],
      error: ''
    }
    try{
      const result = await this.callModel.find().exec();
      response.data = result
    }catch (err){
      console.log('Error during fetching call logs: ', err)
      response.error = 'Error during getting call logs'
    }
    return response
  }

  /**
   * Webhook for twilio, when call is made to assigned number
   */
  makeCall(): XMLDocument {
    const twilioControl = new this.VoiceResponse()

    const gather = twilioControl.gather({
      numDigits: 1,
      action: `${this.BasePath}forward`,
    });
     
    gather.say('Please, press 1 to talk to our agent. Press 2 to leave a voice message');
    
    return twilioControl
  }

  /**
   * Api called by twilio with caller pressed number
   * If the caller presses 1, call is forwarded to another phone number;
   * If the caller presses 2, he is able to leave a voicemail. 
   * @param req 
   * @returns xml to twilio
   */
  forwardCall(req): XMLDocument {
    const twilioControl = new this.VoiceResponse()

    const { Digits } = req.body
    if(Digits) {
      if (Digits == FORWARDING_OPTIONS.FORWARD_CALL){
        // Call will be forwarded to registered number
        twilioControl.say("Please wait, you will be connected to first available agent.");
        const dial = twilioControl.dial({
            action: `${this.BasePath}hangup/${AGENT_STATUS}`,
            callerId: config.FORWARDING_PHONE_NUMBER,
          });
          dial.number(
            config.FORWARDING_PHONE_NUMBER
        );
        return twilioControl;
      } else if( Digits == FORWARDING_OPTIONS.RECORD_VOICE) {
        // Caller will be able to record voice message
        twilioControl.say('Please leave a message after the beep and press hash at end of your message.');
        twilioControl.record({
            action: `${this.BasePath}hangup/${VOICE_MAIL_STATUS}`,
            finishOnKey: '#'
        });
        return twilioControl;
      } else {
        // Call will be redirected to main menu
        twilioControl.say("Please try again.");
        twilioControl.pause();
        twilioControl.redirect(`${this.BasePath}call`);
      }
    } else {
      twilioControl.redirect(`${this.BasePath}call`);
    }
    return twilioControl
  }

  /**
   * Method will be called by twilio when call is ended
   * Used to respond call with hangup message and store call log.
   * @param req 
   * @returns 
   */
  async hangUpCall(req): Promise<XMLDocument> {
    const twilioControl = new this.VoiceResponse();
    twilioControl.say('Thank you for call, Bye.');
    twilioControl.hangup();
    console.log("call ended");

    console.log('Body: ', req.body)

    let { RecordingUrl, RecordingDuration, Direction, Caller, CallStatus, CallSid } = req.body;
    let { action: status } = req.params;
    const callData: any = {
      callSid: CallSid, 
      callDirection: Direction,
      caller: Caller,
      callStatus: CallStatus,
      status,
    }

    if( status === VOICE_MAIL_STATUS ){
      callData.recordingUrl = RecordingUrl;
      callData.callDuration = Number(RecordingDuration);
    }

    try{
      // Storing call log
      const callLog = new this.callModel(callData);
      const result = await callLog.save();
    }
    catch(err){
      // Not returning error because method is called by twilio
      console.log("Exception during saving call log: ", err);
    }

    return twilioControl;
  }
}
