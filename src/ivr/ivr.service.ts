import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { twiml } from 'twilio';
import { ICall } from './../Interfaces';

@Injectable()
export class IvrService {
  constructor(@InjectModel('Call') private CallSchema: Model<ICall>) {}

/**
   * Generates TwiML for the welcome message.
   * 
   * @returns {string} TwiML response for the welcome message.
   */

  welcome(): string {
    const voiceRepsonse = new twiml.VoiceResponse();
    const gather = voiceRepsonse.gather({
      action: '/ivr/menu',
      numDigits: 1,
      method: 'POST',
    });

    for (let i = 0; i < 3; i++) {
      gather.say('Thanks For Calling Turing Technology ');
      gather.pause('1');
      gather.say('Please Press 1 for Recording your VoiceMail');
      gather.pause('1');
      gather.say('Please Press 2 to call FARAZ');
      gather.pause('1');
    }
    gather.say("You didnot select any option")
    voiceRepsonse.redirect('/ivr/hangup')

    return voiceRepsonse.toString();
  }

    /**
   * Generates TwiML for the recording message.
   * 
   * @returns {string} TwiML response for the recording message.
   */

  recording(): string {
    const voiceRepsonse = new twiml.VoiceResponse();

    voiceRepsonse.say('We Will Start Recording after a beep');

    voiceRepsonse.pause('1');
    voiceRepsonse.say(
      ' When you are finish with your VoiceMaill Please Press # or we will stop the voice mail after 10 seconds.',
    );

    voiceRepsonse.record({
      timeout: 10,
      transcribe: true,
      action: '/ivr/hangup',
      finishOnKey: '#',
      maxLength: 10, //10 seconds of voicemail
      trim: 'trim-silence', //remove silence part.
    });

    //hangout after 10 seconds

    return voiceRepsonse.toString();
  }


  /**
   * Generates TwiML for the hangup message.
   * 
   * @param {ICall} callDoc The call document to be updated.
   * @returns {Promise<string>} TwiML response for the hangup message.
   */

  async hangup(callDoc: ICall): Promise<string> {
    const voiceRepsonse = new twiml.VoiceResponse();
    voiceRepsonse.say('Thank you for calling Turing Technology, Good Bye!');
    voiceRepsonse.hangup();
    await this.CallSchema.create(callDoc);
    return voiceRepsonse.toString();
  }

  /**
   * Generates TwiML for calling Faraz.
   * 
   * @returns {string} TwiML response for calling Faraz.
   */

  callFaraz(): string {
    const voiceRepsonse = new twiml.VoiceResponse();

    voiceRepsonse.dial('+923161504150');

    return voiceRepsonse.toString();
  }

  /**
   * Generates TwiML for redirecting to the welcome message.
   * 
   * @returns {string} TwiML response for redirecting to the welcome message.
   */



  /**
   * Handles menu options based on the digit pressed.
   * 
   * @param {string} digit The digit pressed by the user.
   * @returns {string} TwiML response based on the menu option selected.
   */

  menu(digit:string): string {
    const optionActions = {
      '1': this.recording,
      '2': this.callFaraz,
    };

    return optionActions[digit]()
  }

  /**
   * Updates the call duration in the database.
   * 
   * @param {ICall} callDoc The call document with call duration.
   */

  async updateCallTime(callDoc: ICall) {
    if (!callDoc.call_duration) {
      throw new Error('No Call Duration Found');
    }

    //update document for call if already exist, In case of recording we already create a doc and add recording details to it on hangup api
    const updatedDoc = await this.CallSchema.findOneAndUpdate(
      { CallSid: callDoc.CallSid },
      { call_duration: callDoc.call_duration },
    );

    //if no doc exist create doc, with Duration Details
    if (!updatedDoc) {
      await this.CallSchema.create(callDoc);
    }
  }
}
