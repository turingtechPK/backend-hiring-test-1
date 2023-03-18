import { Injectable } from "@nestjs/common";
import { Twilio } from "twilio";
const VoiceResponse = require("twilio").twiml.VoiceResponse;
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class TwilioService{
    private client: Twilio;

    constructor(){
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    getTwilioClient(){
        return this.client;
    }
    getVoiceResponse(){
        const twimlVoiceResponse = new VoiceResponse();
        return twimlVoiceResponse;
    }

    receiveIncomingCall() {
        const twiml = this.getVoiceResponse();
        const helper = twiml.gather({
            numDigits:1,
            action:"/api/v1/calls/handleCall"
        })

        helper.say("Thank you for calling Test Organization. For Assistance press 1. To drop a message, press 2.")
        return twiml.toString();
    }

    handleIncomingCall(req) {
        const twiml = this.getVoiceResponse();
        const option = req.body.Digits;
        if(option==='1'){
            const dial = twiml.dial();
            dial.number(process.env.PERSONAL_PHONE);
        }
        else if(option==='2'){
            const gather = twiml.gather({
                input:'dmtf',
                timeout:3,
                numDigits:1
            })
            gather.say('Please leave a message after the beep.');
            twiml.record({
                maxLength:30,
                action:'/api/v1/calls/voiceMail',
                method:'POST'
            })
        }
        else{
            twiml.say('Sorry. Invalid Response')
            twiml.hangup();
        }
        return twiml.toString();
    }

    endVoiceMailRecoring() {
        const twiml = this.getVoiceResponse();
        twiml.say('Thank you. We have received your message');
        twiml.hangup();    
        return twiml.toString();
    }

    async getCallDetails(callSid){
        return await this.client.calls(callSid).fetch();
    }
}