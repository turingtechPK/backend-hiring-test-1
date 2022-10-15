import { Injectable } from '@nestjs/common';
import { twiml } from 'twilio';
import { CallsService } from '../calls/calls.service';

@Injectable()
export class IvrService {
  constructor(readonly callsService: CallsService) {}

  //This function basically returns the started message asking caller if they want to call or leave a message.
  //And check if the caller has pressed any buttons. If pressed system follows the set cases for the button pressed.
  ivr(Digits: string, From: string) {
    const voiceResponse = new twiml.VoiceResponse();
    // If the user entered digits, process their request
    if (Digits) {
      switch (Digits) {
        case '1':
          voiceResponse.redirect('/ivr/call-forwarding');
          break;
        case '2':
          voiceResponse.redirect('/ivr/voice-mail');
          break;
        default:
          voiceResponse.say("Sorry, I don't understand that choice.");
          voiceResponse.pause();
          this.gather(voiceResponse);
          break;
      }
    } else {
      // If no input was sent, use the <Gather> verb to collect user input
      this.gather(voiceResponse);
    }

    return voiceResponse.toString();
  }

  //This function handles the call forwarding.
  //If the caller decides to call the call is forward to the number set in the .env file.
  /*And once the call is completed it redirect to store the imformation for the call to the url that
  handles the addition of the call data after call ends.*/
  callForward() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say('connecting to costumer service');
    const startTime = new Date().getTime();
    voiceResponse.dial(
      {
        answerOnBridge: true,
        timeLimit: 50,
        action: `/calls/${startTime}`,
        method: 'GET',
      },
      process.env.REDIRECT_NUMBER,
    );
    return voiceResponse.toString();
  }

  //This function handles the voicemail.
  /*If the caller decides to send a voicemail their call is recorder and the data is stored by again
  redirecting to the data handler route that adds data after voicemail ends.*/
  voicemail() {
    const voiceResponse = new twiml.VoiceResponse();
    voiceResponse.say('Hello. Please leave a message after the beep.');
    const startTime = new Date().getTime();
    voiceResponse.record({
      maxLength: 30,
      transcribe: true,
      transcribeCallback: `/calls/${startTime}`,
    });
    return voiceResponse.toString();
  }

  //This is the function that will tell the option to the caller and gather their button press input.
  //It the caller doesnot press any button the process will start again.
  gather(voiceResponse) {
    const gatherNode = voiceResponse.gather({ numDigits: 1 });
    gatherNode.say(
      'To redirect call to costumer servie, press 1. For voicemail , press 2.',
    );
    // If the user doesn't enter input, loop
    voiceResponse.redirect('/ivr');
  }
}
