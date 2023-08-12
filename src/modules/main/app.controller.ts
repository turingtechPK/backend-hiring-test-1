import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ResponseCode, ResponseMessage } from '@utils/enum';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('api/ping')
  ping(@Res() res: Response): Response {
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
    });
  }
}
