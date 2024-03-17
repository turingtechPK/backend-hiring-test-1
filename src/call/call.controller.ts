import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallService } from './call.service';

@Controller()
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post('/recieving-call')
  recieveACall(@Body() payload: any) {
    return this.callService.receiveCall(payload)
  }

  @Post('/select-option')
  getOption(@Body() payload: any) {
    return this.callService.getOption(payload)
  }

  @Post('/handle-voicemail')
  handleVoiceMail(@Body() payload: any) {
    return this.callService.handleVoiceMail(payload)
  }
}
