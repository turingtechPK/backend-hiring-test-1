import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CallService } from './call.service';
import { Request, Response } from 'express';
import { ResponseCode, ResponseMessage } from '@utils/enum';

@Controller('api/call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('list')
  async getAllCalls(@Res() res: Response): Promise<Response> {
    const calls = await this.callService.getAllCalls();
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
      data: calls,
    });
  }

  @Post('process')
  public async processCall(
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    return await this.callService.processCall(req, res);
  }

  @Post('input')
  public async handleInput(@Res() res: Response, @Req() req: Request) {
    return await this.callService.handleInput(req, res);
  }

  @Post('end')
  public async endCall(@Res() res: Response, @Req() req: Request) {
    return await this.callService.endCall(req, res);
  }
}
