import { Controller, Get, Param } from '@nestjs/common';
import { CallLogService } from './calllog.service';
import { Call } from '@prisma/client';

@Controller('call-log')
export class CallLogController {
  constructor(private readonly callLogService: CallLogService) {}

  @Get()
  async getAllCallLogs(): Promise<Call[]> {
    return this.callLogService.calllogs({});
  }

  @Get('/:id')
  async getCallLog(@Param('id') id: number): Promise<Call | null> {
    return this.callLogService.calllog(id);
  }
}
