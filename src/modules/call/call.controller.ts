import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CallService } from './call.service';
import { Request, Response } from 'express';
import { ResponseCode, ResponseMessage } from '@utils/enum';

@Controller('api/call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('list')
  async getCallList(@Res() res: Response): Promise<Response> {
    const calls = await this.callService.getCallList();
    return res.status(ResponseCode.SUCCESS).send({
      statusCode: ResponseCode.SUCCESS,
      message: ResponseMessage.SUCCESS,
      data: calls,
    });
  }

  @Post('voice')
  public async handleCall(
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response> {
    return await this.callService.handleCall(req, res);
  }

  @Post('gather')
  public async handleInput(@Res() res: Response, @Req() req: Request) {
    return await this.callService.handleInput(req, res);
  }

  @Post('end-call')
  public async handleCallEnd(@Res() res: Response, @Req() req: Request) {
    return await this.callService.handleCallEnd(req, res);
  }
}
