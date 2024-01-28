import { Inject, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class TwilioService {
  constructor(@Inject('Twilio') private readonly twilioClient: Twilio) {}

  async generateVoiceResponse(webhookPayload?: Record<string, any>) {
    try {
      // Access the twilio webhook to initiate the process
      const twiml = new VoiceResponse();
      const gather = await twiml.gather({
        numDigits: 1,
        action: `${process.env.NGROK_URL}/call/select-option`,
        method: 'POST',
      });

      // Condition to skip re-creating record in twilio account for redirected calls
      if (webhookPayload) {
        await this.createTwilioCall(webhookPayload.From, webhookPayload.To);
      }

      await gather.say(
        'Press 1 to forward the call. Press 2 to leave a voicemail.',
      );

      return await twiml.toString();
    } catch (error) {
      throw error;
    }
  }

  async handleKeyPress(
    digitPressed: string,
    webhookPayload: Record<string, any>,
  ) {
    try {
      const twiml = await new VoiceResponse();

      if (digitPressed === '1') {
        await this.forwardCall();
      } else if (digitPressed === '2') {
        return await this.recordVoiceMail();
      } else {
        // If wrong option then redirect the caller to start
        await twiml.say(
          'You have not selected the right option. Please try again.',
        );

        if (webhookPayload) {
          return await this.generateVoiceResponse();
        }
      }

      return await twiml.toString();
    } catch (error) {
      throw error;
    }
  }

  async recordVoiceMail() {
    try {
      const twiml = await new VoiceResponse();

      // If pressed 2 then redirect the caller to record the msg
      await twiml.say('Please leave a message after the beep.');

      await twiml.record({
        maxLength: 15,
        playBeep: true,
        action: `${process.env.NGROK_URL}/call/voice-mail`,
        method: 'POST',
      });
      return await twiml.toString();
    } catch (error) {
      throw error;
    }
  }

  async callHangup() {
    try {
      // Hangup the call once msg is recorded
      const twiml = await new VoiceResponse();
      await twiml.say('Your message has been recorded. Bye!');

      return await twiml.toString();
    } catch (error) {
      throw error;
    }
  }

  private async createTwilioCall(from: string, to: string) {
    try {
      // Create twilio call instance within twilio console
      return await this.twilioClient.calls.create({
        from: from,
        to: to,
        url: `${process.env.NGROK_URL}/call/receive-incoming-call`,
      });
    } catch (error) {
      throw error;
    }
  }

  private async forwardCall() {
    try {
      // If pressed 1 then forward the call to my personal number
      const twiml = new VoiceResponse();
      await twiml.dial().number(process.env.PERSONAL_PHONE_NUMBER);
    } catch (error) {
      throw error;
    }
  }
}
