import { TwilioService } from './../twilio/twilio.service';
import { CallService } from './call.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';

@Controller('calls')
export class CallController {
  constructor(
    private callService: CallService,
    private twilioService: TwilioService,
  ) {}

  @Post('/incoming')
  getIncomingCall(): any {
    return this.twilioService.receiveIncomingCall();
  }

  @Post('/handleCall')
  @Header('content-type', 'text/xml')
  handleIncomingCall(@Request() req: any): any {
    return this.callService.handleIncomingCall(req);
  }

  @Post('/voiceMail')
  handleVoiceMail(@Request() req: any): any {
    return this.callService.handleVoiceMail(req);
  }

  @Get('/')
  getAllCalls(): any {
    return this.callService.getAll();
  }

  @Get(':id')
  getCall(@Param() params): any {
    return this.callService.getOne(params.id);
  }
}
