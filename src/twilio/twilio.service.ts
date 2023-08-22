import { Injectable, } from '@nestjs/common';
import { twiml } from 'twilio';
import { VoiceMails, CallStatus, TwilioCallActions, TwilioCallInitiate, TwilioCallStatus, TwilioVoiceMailRedirections } from './dto/twilio.dto/twilio.dto';

@Injectable()
export class TwilioService {

    twilioNumber: string;
    voiceMails: Map<string, VoiceMails>;
    callLogs: Map<string, CallStatus>;

    constructor() {
        this.twilioNumber = "+15855153621"
        this.voiceMails = new Map<string, VoiceMails>;
        this.callLogs = new Map<string, CallStatus>();
    }


    handleCall(callInfo: TwilioCallInitiate): any {

        console.log("handleCall", callInfo);

        const response = new twiml.VoiceResponse();

        if (callInfo.From === this.twilioNumber) {
            const gather = response.gather({
                action: "/twilio/callgoodbye",
                method: "POST",
            })

            gather.say("Turing Technology Reresentative Here!. Thanks for Calling.")
        } else {
            const gather = response.gather({
                action: "/twilio/call/action",
                method: "POST",
                numDigits: 1,
                timeout: 10
            })

            gather.say("Thanks you for calling Turing Technologies!. Please press 1 to forward your call or press 2 to record a voicemail")
        }

        return response.toString();

    }

    handleActions(data: TwilioCallActions): any {
        const digit = data.Digits;
        const response = new twiml.VoiceResponse();

        if (digit === '1') {
            response.say("Connecting you to Turing Technologies Representative.");
            response.dial({
                action: "/twilio/call/goodbye",
                method: "POST",
            }, "+923135200178");
        } else if (digit === '2') {
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
        const response = new twiml.VoiceResponse();
        response.say("Thank you for calling Turing Technologies! Goodbye.");
        response.hangup();

        return response.toString();
    }

    handleCallRecord(data: TwilioVoiceMailRedirections): any {
        let voiceMail = new VoiceMails();
        voiceMail.CallSid = data.CallSid;
        voiceMail.CallStatus = data.CallStatus;
        voiceMail.Caller = data.Caller;
        voiceMail.RecordingDuration = data.RecordingDuration;
        voiceMail.RecordingUrl = data.RecordingUrl;

        this.voiceMails.set(data.CallSid, voiceMail);
    }

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

    getAllCalls(): IterableIterator<CallStatus> {
        return this.callLogs.values()
    }

    getAllCallRecordings(): IterableIterator<VoiceMails> {
        return this.voiceMails.values()
    }
}
