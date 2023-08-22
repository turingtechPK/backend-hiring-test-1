import { Injectable, } from '@nestjs/common';
import { twiml } from 'twilio';
import { VoiceMails, CallStatus, TwilioCallActions, TwilioCallInitiate, TwilioCallStatus, TwilioVoiceMailRedirections } from './dto/twilio.dto/twilio.dto';

@Injectable()
export class TwilioService {

    twilioNumber: string;
    voiceMails: Map<string, VoiceMails>;
    callLogs: Map<string, CallStatus>;

    constructor() {
        this.voiceMails = new Map<string, VoiceMails>;
        this.callLogs = new Map<string, CallStatus>();
    }


    handleCall(callInfo: TwilioCallInitiate): any {
        //  the first logic we have when we receieve a call from the caller
        const response = new twiml.VoiceResponse();
        const gather = response.gather({
            action: "/twilio/call/action",
            method: "POST",
            numDigits: 1,
            timeout: 10
        })

        // we inform the caller about what option they have 
        gather.say("Thanks you for calling Turing Technologies!. Please press 1 to forward your call or press 2 to record a voicemail")

        return response.toString();
    }

    handleActions(data: TwilioCallActions): any {
        // this function is invoked when caller presses some option
        const digit = data.Digits;
        const response = new twiml.VoiceResponse();

        // case 1: caller want to talk to the person
        if (digit === '1') {
            // we redirect the call to the respective person
            // when call end we receieve call at "/twilio/call/goodbye" this endpoint
            response.say("Connecting you to Turing Technologies Representative.");
            response.dial({
                action: "/twilio/call/goodbye",
                method: "POST",
            }, "+923135200178");
            // PS: Free twilio account cannot call on international number , i.e. outside us
        } else if (digit === '2') {
            // case 2: voicemail
            // we redirect the user to record their voicemail
            // which we receieve voicemail details at "/twilio/call/record" this endpoint
            response.say("Please leave your voice message after the beep. Note you have a time limit of maximum 60 seconds. To Stop Recording Press Asterisk Key");
            response.record({
                playBeep: true,
                action: "/twilio/call/record",
                method: "POST",
                maxLength: 60,
                finishOnKey: "*",
            })
        } else {
            response.say("You have Entered an Incorrect Option. Thanks for Calling Turing Technologies!");
            response.hangup();
        }
        return response.toString();
    }

    handleCallEnd(): string {
        // a simple function to thank user for calling and end the call
        const response = new twiml.VoiceResponse();
        response.say("Thank you for calling Turing Technologies! Goodbye.");
        response.hangup();

        return response.toString();
    }

    /*
    * helper function to store all the call record 
    * each call have a unique Sid
     */
    handleCallRecord(data: TwilioVoiceMailRedirections): any {
        let voiceMail = new VoiceMails();
        voiceMail.CallSid = data.CallSid;
        voiceMail.CallStatus = data.CallStatus;
        voiceMail.Caller = data.Caller;
        voiceMail.RecordingDuration = data.RecordingDuration;
        voiceMail.RecordingUrl = data.RecordingUrl;

        this.voiceMails.set(data.CallSid, voiceMail);
    }

    /*
   * helper function to store all the voicemail information 
   * each call have a unique Sid
    */
    handleCallStatus(data: TwilioCallStatus): any {
        let callLog = new CallStatus();
        callLog.CallDuration = data.CallDuration;
        callLog.Caller = data.Caller;
        callLog.Timestamp = data.Timestamp;
        callLog.CallStatus = data.CallStatus;
        callLog.CallDuration = data.CallDuration;
        callLog.ErrorMessage = data.ErrorMessage;

        this.callLogs.set(data.CallSid, callLog)

    }

    /*
   * helper function to return all the call record 
    */
    getAllCalls(): IterableIterator<CallStatus> {
        return this.callLogs.values()
    }

    /*
   * helper function to return all the voicemail informations
    */
    getAllCallRecordings(): IterableIterator<VoiceMails> {
        return this.voiceMails.values()
    }
}
