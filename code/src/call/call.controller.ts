import { CallService } from './call.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('calls')
export class CallController {
  constructor(private callService: CallService) {}

  @Get('/')
  getAllCalls(): any {
    return this.callService.getAll();
  }

  @Get(':id')
  getCall(@Param() params): any {
    return this.callService.getOne(params.id);
  }
}
