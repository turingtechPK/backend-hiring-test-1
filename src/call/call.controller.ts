import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CallService } from './call.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Call')
@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @ApiOperation({ summary: 'Receive and start processing incoming calls' })
  @Post('/receive-incoming-call')
  receiveIncomingCall(@Body() webhookPayload: any) {
    return this.callService.receiveIncomingCall(webhookPayload);
  }

  @ApiOperation({ summary: 'Select DTMF Tones either 1 or 2' })
  @Post('/select-option')
  selectOption(@Body() webhookPayload: any) {
    return this.callService.selectOption(webhookPayload);
  }

  @ApiOperation({ summary: 'Directs the caller to a voice mail' })
  @Post('/voice-mail')
  handleVoicemail(@Body() webhookPayload: any) {
    return this.callService.handleVoicemail(webhookPayload);
  }

  @ApiOperation({ summary: 'List of all the calls' })
  @ApiQuery({ name: 'offset', required: true, example: 0 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  @Get('activity-feed')
  activityFeed(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.callService.acivityFeed(offset, limit);
  }
}
