import { Body, Controller, Post } from '@nestjs/common';
import { ICall } from 'src/Interfaces';
import { CallObj, Digit } from '../decorators';
import { IvrService } from './ivr.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('ivr')
@ApiTags('IVR')
export class IvrController {
  constructor(private ivrService: IvrService) {}

  @ApiOperation({
    summary: 'Welcome endpoint',
    description: 'Speaks Welcome Message and Send Request to Menu EndPoint',
  })
  @ApiResponse({
    status: 201,
    description:
      'Pass the Request To Menu with the button pressed so that Menu can call respective functionality and if no button is pressed will hang up the call',
  })
  @Post('welcome')
  welcome() {
    return this.ivrService.welcome();
  }






  @ApiOperation({ summary: 'Menu endpoint', description: 'Handles menu options.' })
  @ApiBody({ description: 'Digit pressed by the caller', type: String })
  @ApiResponse({ status: 201, description: 'Returns the result based on the digit pressed.' })
  @Post('menu')
  menu(@Digit() digit: string) {
    return this.ivrService.menu(digit);
  }


  @ApiOperation({ summary: 'Hangup endpoint', description: 'Handles hangup action.' })
  @ApiResponse({ status: 200, description: 'Returns a message after hangup. and creates new call record with recording details.' })

  @Post('hangup')
  async hangup(@CallObj() CallObj: ICall) {
    return await this.ivrService.hangup(CallObj);
  }



  @ApiOperation({ summary: 'Call status endpoint', description: 'Handles call status updates.' })
  @ApiResponse({ status: 200, description: 'Returns a message after updating call status.' })
  @Post('call-status')
  async callStatus(@CallObj() CallObj: ICall) {
    return await this.ivrService.updateCallTime(CallObj);
  }
}
