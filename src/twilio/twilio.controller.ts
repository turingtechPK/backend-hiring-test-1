import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import * as TwilioDTO from './dto';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('recieve-call')
  recieveCall(@Body() body: TwilioDTO.RecieveCall) {
    return this.twilioService.recieveCall(body);
  }

  @Post('respond-to-dialpad')
  respondToDialpad(@Body() body: TwilioDTO.RespondToDialpad) {
    return this.twilioService.respondToDialpad(body);
  }

  @Post('save-call')
  saveCall(@Body() body: TwilioDTO.SaveCall) {
    return this.twilioService.saveCall(body);
  }

  @Post('forward-call')
  forwardCall() {
    return this.twilioService.forwardCall();
  }

  @Post('record-voice-message')
  recordVoiceMessage() {
    return this.twilioService.recordVoiceMessage();
  }

  @Post('save-voice-message')
  saveVoiceMessage(@Body() body: TwilioDTO.SaveVoiceMessage) {
    return this.twilioService.saveVoiceMessage(body);
  }

  @Get('history')
  fetchHistory(@Query() query: TwilioDTO.FetchHistory) {
    return this.twilioService.fetchHistory(query);
  }
}
