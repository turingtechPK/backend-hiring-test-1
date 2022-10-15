import { Controller, Post, Body } from '@nestjs/common';
import { IvrService } from './ivr.service';

@Controller('ivr')
export class IvrController {
  constructor(private readonly ivrService: IvrService) {}

  // This will be the starting route where the ivr is implemented
  @Post()
  ivr(@Body() createIvrDto: any) {
    return this.ivrService.ivr(createIvrDto.Digits, createIvrDto.From);
  }

  // This will be run if the caller selects to leave a voicemail.
  @Post('voice-mail')
  voicemail() {
    return this.ivrService.voicemail();
  }

  // This will be run if the caller selects to have a direct call.
  @Post('call-forwarding')
  callForwarding() {
    return this.ivrService.callForward();
  }
}
