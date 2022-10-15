import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecordingDto } from '../recordings/dto/recording.dto';
import { CallsService } from './calls.service';
import { UpdateCallsDto } from './dto/update-calls.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  //This is the redirect url that the voicemail function will redirect to once the voicemail is recorded.
  /*As the redirect from the voicemail function is a post request. It sends in a body which 
  I have created a type of for better handling. All the data we will be needing will be recieved from there.*/
  @Post(':startTime')
  createAfterVoiceMailEnd(
    @Body() recordingDto: RecordingDto,
    @Param('startTime') startTime: string,
  ) {
    return this.callsService.createAfterVoiceMailEnd(recordingDto, +startTime);
  }

  //This is the redirect url that the callforwarding function will redirect to once the call is ended.
  //The call forwarding function will send the data we need as query parameters.
  @Get(':startTime')
  createAfterCallEnd(
    @Query('DialCallStatus') dialCallStatus: string,
    @Param('startTime') startTime: string,
    @Query('Caller') from: string,
    @Query('To') to: string,
  ) {
    return this.callsService.createAfterCallEnd(
      from,
      +startTime,
      dialCallStatus,
      to,
    );
  }

  //Route to get all the call histories
  @Get('callhistory/all')
  callHistory() {
    return this.callsService.callHistory();
  }

  //Route to get all the call histories for a specific number
  @Get('callhistory/phone/:phoneNo')
  callHistoryForACertainNumber(@Param('phoneNo') phoneNo: string) {
    return this.callsService.callHistoryForACertainNumber(phoneNo);
  }
}
