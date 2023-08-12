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

  async getCallList(): Promise<Call[]> {
    const sql = `SELECT * FROM calls`;
    const calls = await this.repository.query(sql);
    return calls;
  }

  /**
   * Fuction To Handle Call
   * @param req
   * @param res
   * @returns
   */
  public async handleCall(req: Request, res: Response) {
    const twiml = await this.twilioService.handleCall();
    res.type('text/xml');
    res.send(twiml.toString());
    return res;
  }

  /**
   * Function To Handle Input
   * @param req
   * @param res
   */
  public async handleInput(req: Request, res: Response) {
    let twiml;
    if (req.body.Digits) {
      switch (Number(req.body.Digits)) {
        case 1:
          twiml = this.twilioService.sendVoiceResponse(
            "You've chosen option 1. Your call will now be forwarded."
          );
          await this.twilioService.forwardCall(twiml);
          break;
        case 2:
          twiml = this.twilioService.sendVoiceResponse(
            "You've picked option 2. Kindly record your message after the beep. Press the pound key to terminate the call after finishing your recording."
          );
          await this.twilioService.recordCall(twiml);
          break;
        default:
          twiml = this.twilioService.sendVoiceResponse(
            "Sorry, I don't understand that choice."
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
  async handleCallEnd(req: Request, res: Response) {
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
}
