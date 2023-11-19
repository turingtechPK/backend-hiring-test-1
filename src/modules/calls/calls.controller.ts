import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CallsService } from './calls.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('calls')
@ApiTags('Calls')
export class CallsController {
  constructor(private callService: CallsService) {}
  
  @Post('incoming')
  async incoming(@Res() res: Response) {
    const twiml = await this.callService.incoming();
    res.type('text/xml');
    res.send(twiml.toString());
  }

  @Post('selection') 
  async selection(
    @Body() body: any,
    @Res() res: Response,
  ) {
    const twiml = await this.callService.selection(body.Digits);
    res.type('text/xml');
    res.send(twiml.toString());
  }

  @Post('voicemail') 
  async handleVoicemail(@Body() messageDate: any, @Res() res: Response) {
    const twiml = await this.callService.saveMessage(messageDate);
    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  }

  @Get('logs') 
  async getCallLog() {
    return await this.callService.getCallLog();
  }
}