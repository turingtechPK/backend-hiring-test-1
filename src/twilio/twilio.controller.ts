import { Body, Controller, Get, Post } from '@nestjs/common';
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
        // this is the first function 
        // it directs caller on what options one have
        const response = this.twilioService.handleCall(data);
        return response;
    }

    @Post('/call/action')
    @ApiBody({
        type: TwilioCallActions
    })
    handleCallAction(@Body() data: TwilioCallActions): any {
        // after the user is informed about the available options
        // they can select an options upon which we have our flows
        return this.twilioService.handleActions(data)
    }

    @Post('/call/goodbye')
    handleCallEnd(): any {
        // when the user finally ends the call user is thanks for calling
        // finally the call is terminated
        return this.twilioService.handleCallEnd()
    }

    @Post('/call/record')
    @ApiBody({
        type: TwilioVoiceMailRedirections
    })
    handleCallRecord(@Body() data: TwilioVoiceMailRedirections) {
        // if a user choses to send a voicemail then twilio calls this function 
        // it store the information about the voice mail of user
        this.twilioService.handleCallRecord(data)
    }

    @Post('/call/status')
    @ApiBody({
        type: TwilioCallStatus
    })
    handleCallStatus(@Body() data: TwilioCallStatus) {
        // after the call ends this function gets called from twilio
        // it updated the call log 
        this.twilioService.handleCallStatus(data)
    }

    @Get('/call/logs')
    @ApiBody({})
    @ApiResponse({
        type: [CallStatus]
    })
    getAllCalls(): IterableIterator<CallStatus> {
        // a helper function where the users can view their call logs 
        return this.twilioService.getAllCalls();
    }

    @Get('/call/voicemail')
    @ApiResponse({
        type: [VoiceMails]
    })
    getAllCallRecordings(): IterableIterator<VoiceMails> {
        // a helper function to return user details about voicemail receieved
        return this.twilioService.getAllCallRecordings();
    }

}
