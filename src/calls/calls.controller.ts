import { Body, Controller, Get, Post, Render, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { InboudCallDto } from './InboundCallDto';
import { RecordingDto } from './RecordingDto';
import { CallsService } from './calls.service';

@Controller('calls')
export class CallsController {
    constructor(private readonly callsService: CallsService) {}

    @Get('/')
    @Render('index')
    async getCalls() {
      const callsList = await this.callsService.getAllCalls();
      return {callsList};
    }

    @Post('/inbound')
    async receiveCall(@Body() inboudCall: InboudCallDto, @Response() res): Promise<Res> {    
      const response = await this.callsService.receiveCall(inboudCall);
      res.set({ 'Content-Type': 'text/xml' });
      return res.send(response);
    }

    @Post('/update/call')
    async updateCallStatus(@Body() inboudCall: InboudCallDto, @Response() res): Promise<Res> {    
      const response = await this.callsService.updateCallStatus(inboudCall);
      res.set({ 'Content-Type': 'text/xml' });
      return res.send(response);
    }
  
    @Post('/recording')
    async receiveRecording(@Body() recording: RecordingDto, @Response() res): Promise<Res> {    
      const response = await this.callsService.receiveRecording(recording);
      res.set({ 'Content-Type': 'text/xml' });
      return res.send(response);
    }
  
    @Get('/test-db')
    async testDb(@Response() res) {
      return process.env;
      const response = await this.callsService.testDb();
      // return response;
      return res.send(response);
    }
}
