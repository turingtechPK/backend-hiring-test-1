import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from './call.entity';
import { TwilioService } from '@utils/twilio/twilio.service';

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(Call)
    private readonly repository: Repository<Call>,
    private readonly twilioService: TwilioService
  ) {}


  public async processCall(req: Request, res: Response) {
    const twiml = await this.twilioService.processCall();
    res.type('text/xml');
    res.send(twiml.toString());
    return res;
  }


  public async handleInput(req: Request, res: Response) {
    let twiml;
    if (req.body.Digits) {
      switch (Number(req.body.Digits)) {
        case 1:
          twiml = this.twilioService.sendVoiceResponse(
            "Your call is being forwarded. kindly hold"
          );
          await this.twilioService.forwardCall(twiml);
          break;
        case 2:
          twiml = this.twilioService.sendVoiceResponse(
            "Kindly record your message after the beep.To terminate the call press the pound key?"
          );
          await this.twilioService.recordCall(twiml);
          break;
        default:
          twiml = this.twilioService.sendVoiceResponse(
            "Invalid Input"
          );
          break;
      }
    }
    res.type('text/xml');
    res.send(twiml.toString());
  }

  /**
   * Function To Handle Call End
   * @param req
   * @param res
   */
  async endCall(req: Request, res: Response) {
    const {
      CallSid,
      From,
      To,
      RecordingDuration,
      RecordingSid,
      RecordingUrl,
      Direction,
      FromCountry,
      ToCountry,
    } = req.body;
    const callObject = {
      CallSid,
      From,
      To,
      RecordingDuration,
      RecordingSid,
      RecordingUrl,
      Direction,
      FromCountry,
      ToCountry,
    };
    let twiml = await this.twilioService.hangup();
    let call = new Call().fromDto(callObject);
    await this.repository.save(call);
    res.type('text/xml');
    res.send(twiml.toString());
  }

  async getAllCalls(): Promise<Call[]> {
    const calls = await this.repository.find()
    return calls;
  }

}
