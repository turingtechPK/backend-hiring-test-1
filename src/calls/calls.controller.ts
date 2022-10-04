import { Controller, Get, Body, Post } from '@nestjs/common';
import { CallsService } from './calls.service';
import { Records } from './records.schema';
import { createRecordDto } from './dto/createRecordsDto';
import { Observable } from 'rxjs';
@Controller('calls')
export class CallsController {
  constructor(private CallsService: CallsService) {}

  @Get()
  allrecords(): Promise<Records[]> {
    return this.CallsService.getAllRecords();
  }
  @Post()
  callSetup(@Body() body: createRecordDto) {
    return this.CallsService.setup(body);
  }
  @Post('callInprogress')
  inProgress(@Body() body) {
    return this.CallsService.inbound(body);
  }

  @Post('saveCall')
  saveRecords(@Body() body: createRecordDto) {
    return this.CallsService.saveCall(body);
  }
  @Post('saveVoice')
  saveVoice(@Body() body: createRecordDto) {
    return this.CallsService.saveVoice(body);
  }
  @Get('callForwarding')
  callForwarding() {
    return this.CallsService.callForwarding();
  }
  @Get('recordVoice')
  recordVoice() {
    return this.CallsService.recordVoice();
  }
}
