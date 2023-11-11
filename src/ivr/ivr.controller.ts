import { Body, Controller, Post, Header } from '@nestjs/common';
import { IVRService } from './ivr.service';

@Controller('ivr')
export class IVRController {
  constructor(private readonly ivrService: IVRService) {}

  @Post('/incoming-call')
  async introduction(): Promise<string> {
    return this.ivrService.intro();
  }

  @Post('/menu')
  @Header('content-type', 'text/xml')
  async menu(@Body() body: any) {
    return this.ivrService.menu(body.Digits);
  }

  @Post('/recording')
  async record(@Body() body: any): Promise<string> {
    return this.ivrService.recordCallback(body.recordingUrl);
  }
}
