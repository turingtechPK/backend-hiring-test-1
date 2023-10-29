import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CallService } from './call.service';

@Controller('call')
export class CallController {
  constructor(private callService: CallService) {}

  @Post('incoming') //this route will be called when user will call on my twilio number
  handleIncomingCall(@Res() response: Response): void {
    const twiml = this.callService.handleIncomingCall();
    response.type('text/xml');
    response.send(twiml.toString());
  }

  @Post('gather') //this route will be called when user will press a button
  async handleGatherInput(
    @Body() body: { Digits: string },
    @Res() response: Response,
  ): Promise<void> {
    const twiml = await this.callService.handleGatherInput(body.Digits);
    response.type('text/xml');
    response.send(twiml.toString());
  }

  @Post('voicemail') //this route will be called when user will choose to record voicemail
  async handleVoicemail(@Body() voiceMailData: any, @Res() res: Response) {
    const twiml = await this.callService.saveVoiceMail(voiceMailData);
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  }

  @Get('/call/:id') //to retreive details on one call
  async getCallLogById(@Param('id') id: string) {
    return await this.callService.getCallLogById(id);
  }
  @Get('/call/') //to retrieve all call log from database
  async getCallLog() {
    return await this.callService.getAllCallLogs();
  }
}
