import { Controller, Get, Body, Post } from '@nestjs/common';
import { CallsService } from './calls.service';
import { Records } from './records.schema';
import { createRecordDto } from './dto/createRecordsDto';
import { Observable } from 'rxjs';
@Controller('calls')
export class CallsController {
  constructor(private CallsService: CallsService) {}

  @Get('allRecords')
  allrecords(): any {
    return this.CallsService.getAllRecords();
  }

  @Post('inbound')
  inbound(@Body() body): any {
    return this.CallsService.inbound(body);
  }
  @Post('callSetup')
  callsetup(@Body() body: createRecordDto): any {
    return this.CallsService.setup(body);
  }
  @Post('saveCall')
  saverecords(@Body() body: createRecordDto): any {
    return this.CallsService.saveCall(body);
  }
  @Post('saveVoice')
  savevoice(@Body() body: createRecordDto): any {
    return this.CallsService.saveVoice(body);
  }
  @Get('forwarding')
  forwarding(): any {
    return this.CallsService.callForwarding();
  }
  @Get('recordVoice')
  recordvoice(): any {
    return this.CallsService.recordVoice();
  }
}
