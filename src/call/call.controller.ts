import { Controller, Get, Header, Param, Post, Req, Request} from "@nestjs/common";
import { CallService } from "./call.service";

@Controller('api/v1/calls')
export class CallController{
    constructor(private callService: CallService){}
    
    @Get()
    getAllCalls(){
        return this.callService.getAllCalls();
    }

    @Get(':id')
    getCallByID(@Param('id') id:string){
        return this.callService.getCallByID(id);
    }

    @Post('/incomingCall')
    @Header('content-type', 'text/xml')
    receiveIncomingCall(){
        return this.callService.receiveIncomingCall()
    }

    @Post('/handleCall')
    @Header('content-type', 'text/xml')
    handleIncomingCall(@Req() req:Request){
        return this.callService.handleIncomingCall(req);
    }

    @Post('/handleStatusChange')
    handleStatusChange(@Req() req:Request){
        return this.callService.handleStatusChange(req);
    }

    @Post('/voiceMail')
    @Header('content-type', 'text/xml')
    handleVoiceMailRecording(@Req() req:Request){
        return this.callService.handleVoiceMailRecording(req);
    }

}