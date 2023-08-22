import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { CallStatus, TwilioCallActions, TwilioCallInitiate, TwilioCallStatus, TwilioVoiceMailRedirections, VoiceMails } from './dto/twilio.dto/twilio.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('twilio')
export class TwilioController {
    constructor(private twilioService: TwilioService) { }

    @Post('/call/initiate')
    @ApiBody({
        type: TwilioCallInitiate
    })
    getCall(@Body() data: TwilioCallInitiate): any {
        const response = this.twilioService.handleCall(data);
        return response;
    }

    @Post('/call/action')
    @ApiBody({
        type: TwilioCallActions
    })
    handleCallAction(@Body() data: TwilioCallActions): any {
        return this.twilioService.handleActions(data)
    }

    @Post('/call/goodbye')
    handleCallEnd(): any {
        return this.twilioService.handleCallEnd()
    }

    @Post('/call/record')
    @ApiBody({
        type: TwilioVoiceMailRedirections
    })
    handleCallRecord(@Body() data: TwilioVoiceMailRedirections) {
        this.twilioService.handleCallRecord(data)
    }

    @Post('/call/status')
    @ApiBody({
        type: TwilioCallStatus
    })
    handleCallStatus(@Body() data: TwilioCallStatus) {
        this.twilioService.handleCallStatus(data)
    }

    @Get('/call/logs')
    @ApiBody({})
    @ApiResponse({
        type: [CallStatus]
    })
    getAllCalls(): IterableIterator<CallStatus> {
        return this.twilioService.getAllCalls();
    }

    @Get('/call/voicemail')
    @ApiResponse({
        type: [VoiceMails]
    })
    getAllCallRecordings(): IterableIterator<VoiceMails> {
        return this.twilioService.getAllCallRecordings();
    }

}
