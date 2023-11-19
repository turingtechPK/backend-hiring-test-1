import { TwilioService } from '../twilio/twilio.service';
import {BadRequestException,Injectable} from '@nestjs/common';
import { QueryService } from '@shared/services/query/query.service';
import * as Twilio from 'twilio';

@Injectable()
export class CallsService {
    constructor(
        private _db:QueryService,
        private twilioService: TwilioService,
    ) {}
    
    async incoming() {
    try {
        const twiml =new Twilio.twiml.VoiceResponse();
        const gather = twiml.gather({
        input: ['dtmf'],
        numDigits: 1,
        action: '/calls/selection',
        });
        gather.say(
        { voice: 'woman', language: 'en-US' },
        `Hi thanks for calling. 
        For call forwarding, press 1.
        For recording a message, press 2.`,
        );
        twiml.redirect('/calls/incoming');
        return twiml;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
    }
    
    async selection(choice: string) {
    try {
        const twiml = new Twilio.twiml.VoiceResponse();
        switch (choice) {
        case '1': {
            twiml.say(
            { voice: 'woman', language: 'en-US' },
            'Your call is being forwarded, hold on a second.',
            );
            const dialNumber = process.env.TWILIO_CALL_TO;
            const response = await this.twilioService.dialNumber(dialNumber);
            if (!response) {
            throw new Error('Error occured while forwarding');
            }
            let dataObj={
            from: response.from,
            to: response.to,
            sid: response.sid,
            phoneNumberSid:response.phoneNumberSid,
            accountSid: response.accountSid
            }
            await this._db.insertUpdatDelete('call sp_add_log(?)',[[
            dataObj.from,
            dataObj.to,
            dataObj.sid,
            dataObj.phoneNumberSid,
            dataObj.accountSid,
            null,
            null,
            null,
            'CALL'
            ]])

            break;
        }
        case '2': {
            twiml.say(
            { voice: 'woman', language: 'en-US' },
            'Please leave you 10 second message after the beep.',
            );
            twiml.record({
            action: '/calls/voicemail',
            maxLength: 10,
            playBeep: true,
            });
            break;
        }
        default:
            twiml.say(
            { voice: 'woman', language: 'en-US' },
            "Sorry, but please enter the right choice.",
            );
            twiml.pause();
            twiml.redirect('/calls/incoming');
            break;
        }
        return twiml;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
    }
    
    async saveMessage(response: any) {
    try {
        const twiml = new Twilio.twiml.VoiceResponse();
        twiml.say(
        { voice: 'woman', language: 'en-US' },
        'Thank you. You message has been recorded.',
        );
        let obj={
        to:response.Called,
        from:response.Caller,
        accountSid: response.AccountSid,
        recLink: response.RecordingUrl,
        status: response.CallStatus,
        duration: response.RecordingDuration
        }
    await this._db.insertUpdatDelete(' call sp_add_log(?)',
    [[
        obj.from,
        obj.to,
        null,
        null,
        obj.accountSid,
        obj.recLink,
        obj.status,
        obj.duration,
        'VOICE'
    ]])
        return twiml;
    } catch (error) {
        throw new BadRequestException(error.message);
    }
    }
    
      
    
    async getCallLog() {
        try {
            return this._db.select('call sp_get_call_logs()',[],true);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
