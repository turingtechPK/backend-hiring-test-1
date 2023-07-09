import { Injectable } from '@nestjs/common';
import { Call } from '../models/call.model';
import config from '../config';
import twilio, { twiml } from 'twilio';

@Injectable()
export class CallService {
    private calls: Call[] = [];

    // Forwards the call to a specific number and handles call logging
    async forwardCall(fromNumber: string, twilioObj: twiml.VoiceResponse): Promise<twiml.VoiceResponse> {

        twilioObj.dial({
            action: '/calls/logForwardedCall', // URL to handle call logging
            method: 'GET'
        }, '+923480227469'); // Number to forward the call to
        twilioObj.say('I am unreachable'); // Play a message to the caller

        return twilioObj;
    }

    // Allows the caller to leave a voicemail and handles voicemail logging
    async allowVoicemail(fromNumber: string, twilioObj: twiml.VoiceResponse): Promise<twiml.VoiceResponse> {
        twilioObj.say('Please leave your message after the beep.'); // Prompt the caller to leave a voicemail
        twilioObj.record({
            action: '/calls/logVoiceMail', // URL to handle voicemail logging
            method: 'GET',
            maxLength: 30, // Maximum duration of the voicemail in seconds
            timeout: 10, // Timeout duration in seconds
            transcribe: true // Enable transcription of the voicemail
        });
        return twilioObj;
    }

    // Logs the call details
    logCall(callData: any): void {
        const call: Call = {
            id: this.calls.length + 1,
            status: callData.DialCallStatus != undefined ? callData.DialCallStatus : callData.CallStatus, // Check if DialCallStatus or CallStatus is available
            callDuration: callData.DialCallDuration != undefined ? callData.DialCallDuration : 0, // Check if DialCallDuration is available
            voiceMailDuration: callData.RecordingDuration != undefined ? callData.RecordingDuration : 0, // Check if RecordingDuration is available
            voiceMailLink: callData.RecordingUrl != undefined ? callData.RecordingUrl : '', // Check if RecordingUrl is available
            fromNumber: callData.From,
            fromCountry: callData.FromCountry,
        };

        this.calls.push(call); // Add the call to the list of calls
    }

    // Retrieves all calls
    getAllCalls(): Call[] {
        return this.calls;
    }
}
