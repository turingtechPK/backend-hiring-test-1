import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Server Status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get server status', description: 'Retrieves the status of the server.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful operation', type: String })
  getServerStatus(): string {
    return this.appService.getServerStatus();
  }
}
