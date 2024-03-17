import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TwilioService } from 'src/twilio/twilio.service';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class CallService {
  constructor (private twilioService: TwilioService, private prisma: PrismaService) {

  }
  async receiveCall(payload) {

    //Adds a call record in database
    await this.addCallData(payload);

    //Calls the Twilio Service to handle the Call
    await this.twilioService.receiveCall()
  }

  async getOption(payload) {
    await this.twilioService.getOption(payload)
  }

  async handleVoiceMail(payload) {
    await this.updateCallVoiceMail(payload.CallSid, payload.RecordingUrl)
    await this.updateCallStatus(payload.CallSid, payload)
  }

  async addCallData(callData) {
    await this.prisma.call.create({
      data: {
        call_sid: callData.CallSid,
        caller: callData.From,
        reciever: callData.To,
        call_status: callData.CallStatus,
        voicemail_link: ""
      }
    })
  }

  async updateCallStatus(callSid, updatedCallData) {
    await this.prisma.call.update({
      where: {
        call_sid: callSid
      },
      data: {
        call_status: updatedCallData.CallStatus,
      }
    })
  }

  async updateCallVoiceMail(callSid, voiceMailURL) {
    await this.prisma.call.update({
      where: {
        call_sid: callSid
      },
      data: {
        voicemail_link: voiceMailURL
      }
    })
  }
}
