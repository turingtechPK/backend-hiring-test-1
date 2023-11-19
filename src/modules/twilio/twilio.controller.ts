import { Controller, Param, Post, Res} from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('twilio')
@ApiTags('Twilio')
export class TwilioController {
  constructor(private _twilioService:TwilioService) {}

  @Post('outbound/:number')
  @ApiParam({name:"number",required:true})
  async dialNumber(@Param("number") number : string,@Res() res: Response) {
    this._twilioService.dialNumber(number);
    res.status(200).json( { message: 'Call initiation in progress' })
  }

}
