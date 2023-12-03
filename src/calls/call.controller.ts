import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

import { CallService } from './call.service';

@ApiTags('Call')
@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) { }

  //The entry point
  @Get('incoming')
  @ApiOperation({ summary: 'Receive incoming call', description: 'Handles incoming calls.' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: String })
  async recieveIncomingCall(): Promise<string> {
    return this.callService.handleIncomingCall();
  }
  //Triggered when user selects any option
  @Post('menu-selection')
  @ApiOperation({ summary: 'Handle menu selection', description: 'Called when the user presses 1 or 2.' })
  @ApiBody({ type: String, description: 'Body containing Digits parameter.' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: String })
  @Header('content-type', 'text/xml')
  async menu(@Body() body: any): Promise<string> {
    const { Digits } = body;
    return this.callService.handleMenuSelection(Digits);
  }
  //Triggered when user records a voice
  @Post('record')
  @ApiOperation({ summary: 'Handle voice recording', description: 'Handles voice recording.' })
  @ApiBody({ type: VoiceResponse, description: 'Body containing voice recording details.' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: VoiceResponse })
  async record(@Body() body: any): Promise<typeof VoiceResponse> {
    return this.callService.handleVoiceRecording(body);
  }

  //Triggered when call instance is created
  @Post('log')
  @ApiOperation({ summary: 'Handle call logging', description: 'Handles call logging.' })
  @ApiBody({ type: String, description: 'Body containing call logging details.' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async log(@Body() body: any): Promise<void> {
    return this.callService.handleCallLogging(body);
  }
}
