import {TwimlInterface, twiml} from 'twilio';

export class TwilioService {
    // twiloInstance = null; 
    twiml: TwimlInterface;    
    constructor() {
        // this.twiloInstance = twilio(process.env.NT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.twiml = twiml;
    }

    forwardCall = () => {
        const FORWARD_TO = process.env.FORWARD_PHONENUMBER;
        const voiceResponse = new this.twiml.VoiceResponse();

        voiceResponse.say("Fowarding you to an agent.");
        voiceResponse.dial(FORWARD_TO,
            // {
            // callerId: FORWARD_TO,
            // action: "/calls/goodbye" }
            );
        voiceResponse.redirect("/calls/goodbye")
        return voiceResponse.toString();
    }

    handleIncomingCall = () => {
        const voiceResponse = new this.twiml.VoiceResponse();
        voiceResponse.say("Welcome to call forwarding Api. Press 1 to forward your call to an agent, Press 2 to leave a voicemail.");
        voiceResponse.gather({
            action: "/calls/ivr",
            numDigits: 1,
            timeout: 20
        })
        return voiceResponse.toString();
    }

    handleIvr = (selectedDigit: string) => {
        const voiceResponse = new this.twiml.VoiceResponse();
        switch (selectedDigit) {
            case '1':
                voiceResponse.redirect('/calls/forward');
                break;
            case '2':
                voiceResponse.redirect('/calls/voicemail');
                break;
            default:
                voiceResponse.say("I am sorry I don't understand the input.");
                voiceResponse.redirect("/calls/");
                break;
        }
        return voiceResponse.toString();
    }

    handleVoiceMail = () => {
        const voiceResponse = new this.twiml.VoiceResponse();
        voiceResponse.say("Please record your message after the beep.");
        voiceResponse.record({      
            recordingStatusCallback: "/calls/voicemail/status",
        });
        voiceResponse.redirect("/calls/goodbye")
        return voiceResponse.toString();
    }

    goodbye = () => {
        const voiceResponse = new this.twiml.VoiceResponse();
        voiceResponse.say("Nice talking to you");
        return voiceResponse.toString();
    }
    
}