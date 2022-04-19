import { Controller, Get, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';
import { CallResponse } from './interfaces/call-response.interface'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
    async getCalls(): Promise<CallResponse> {
        return await this.appService.getCalls();
    }

    @Post('/call')
    makeCall(@Res() res: Response) {        
        const result = this.appService.makeCall();
        res.set('Content-Type', 'text/xml');
        res.send(result.toString());
    }

    @Post('/forward')
    forwardCall(@Req() req: Request, @Res() res: Response) {        
        const result = this.appService.forwardCall(req);
        res.set('Content-Type', 'text/xml');
        res.send(result.toString());
    }

    @Post('/hangup/:action')
    async hangUpCall(@Req() req: Request, @Res() res: Response) {        
        const result = await this.appService.hangUpCall(req);
        res.set('Content-Type', 'text/xml');
        res.send(result.toString());
    }
}
