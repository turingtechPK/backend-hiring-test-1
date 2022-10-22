import { Controller, Get, Post, Body, Patch, Param, Delete, Response,Request } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  sendCall() {
    return this.callsService.sendCall();
  }

  @Get()
  receveCall(@Body() createCallDto: CreateCallDto, @Response() res, @Request() req) {
    return this.callsService.receveCall(createCallDto, res, req);
  }

}
