import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallStatusDto } from './dto/update-call-status.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  create(@Body() recvCallDto:CreateCallDto) {
    return this.callsService.handleIncomingCall(recvCallDto);
  }

  @Post('ivr')
  handleIvr(@Body() recvIvrDto: UpdateCallStatusDto){
    const selectedDigit = recvIvrDto.Digits as string;
    return this.callsService.handleIvr(recvIvrDto.CallSid,selectedDigit);
  }

  @Post('forward')
  forwardCall(@Body() forwardCallDto:UpdateCallStatusDto){
    return this.callsService.forwardCall(forwardCallDto.CallSid);
  }

  @Post('voicemail')
  toVoiceMail(@Body() toVoicemailDto: UpdateCallStatusDto){
    return this.callsService.handleVoicemail(toVoicemailDto.CallSid);
  }

  @Post('voicemail/status')
  handleRecordingStatusUpdate(@Body() recordingStatusUpdateDto: UpdateCallStatusDto){
    return this.callsService.handleRecordingStatusUpdate(recordingStatusUpdateDto.CallSid, recordingStatusUpdateDto.RecordingStatus, recordingStatusUpdateDto.RecordingUrl);
  }

  @Post('goodbye')
  goodbye(@Body() goodbyeDto: UpdateCallStatusDto){
    return this.callsService.goodbye(goodbyeDto.CallSid)
  }

}
