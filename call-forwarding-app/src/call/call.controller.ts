import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CallService } from './call.service';

@Controller('call')
export class CallController {
  constructor(private callService: CallService) {}

  @Post('incoming')
  handleIncomingCall(@Res() response: Response): void {
    const twiml = this.callService.handleIncomingCall();
    response.type('text/xml');
    response.send(twiml.toString());
  }

  @Post('gather')
  async handleGatherInput(
    @Body() body: { Digits: string },
    @Res() response: Response,
  ): Promise<void> {
    const twiml = await this.callService.handleGatherInput(body.Digits);
    response.type('text/xml');
    response.send(twiml.toString());
  }

  @Post('voicemail')
  async handleVoicemail(@Body() voiceMailData: any, @Res() res: Response) {
    const twiml = await this.callService.saveVoiceMail(voiceMailData);
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  }

  @Get('/call/:id')
  async getCallLogById(@Param('id') id: string) {
    return await this.callService.getCallLogById(id);
  }
  @Get('/call/')
  async getCallLog() {
    return await this.callService.getAllCallLogs();
  }
}
