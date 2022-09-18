import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CallsService } from '@src/calls/calls.service';
import { CallDto } from '@src/calls/dto/create-call.dto';
import { Response } from 'express';
import { CallEntity } from './entities/call.entity';

@Controller('api/calls')
@ApiTags('twiml')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  dial() {
    return this.callsService.dial();
  }

  @Post('menu')
  redirectMenu(@Body() callDto: CallDto) {
    return this.callsService.redirectMenu(callDto);
  }

  @Post('forwarding')
  callForwarding(@Body() callDto: CallDto, @Res({ passthrough: true }) response: Response<any>) {
    return this.callsService.callForwarding(callDto);
  }

  @Post('voice-mail')
  voiceMail(@Body() callDto: CallDto) {
    return this.callsService.voiceMail(callDto);
  }

  @Post('end')
  endCall(@Body() callDto: CallDto) {
    return this.callsService.endCall(callDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    type: CallEntity,
  })
  findAll(): Promise<CallDto[]> {
    return this.callsService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    type: CallEntity,
  })
  @Get(':CallSid')
  findOne(@Param('CallSid') sid: string): Promise<CallDto> {
    return this.callsService.findOne(sid);
  }

  @Delete(':CallSid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('CallSid') sid: string) {
    return this.callsService.remove(sid);
  }
}
