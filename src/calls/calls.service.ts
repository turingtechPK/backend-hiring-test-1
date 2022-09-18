import { Injectable } from '@nestjs/common';
import { CallDto } from '@src/calls/dto/create-call.dto';
import { twiml as TWIML } from 'twilio';
import { Repository } from 'typeorm';
import { CallEntity } from '@src/calls/entities/call.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CallStatus } from '@src/common/responses/enums';
import responseHandler from '@src/common/responses/responseHandler';
import responseMessages from '@src/common/responses/responseMessages';

@Injectable()
export class CallsService {
  private readonly VoiceResponse = TWIML.VoiceResponse;
  constructor(
    @InjectRepository(CallEntity)
    private readonly callRepo: Repository<CallEntity>,
  ) {}

  dial() {
    const twiml = new this.VoiceResponse();
    const gather = twiml.gather({
      action: '/api/calls/menu',
      numDigits: 1,
      method: 'POST',
    });
    gather.say(
      `Welcome to Ali's IRV System. Please press 1 for call forwarding. Press 2 for leaving a voice mail.`,
    );
    return twiml.toString();
  }

  async redirectMenu(callDto: CallDto) {
    const call = this.callRepo.create(callDto);
    await this.callRepo.save(call);
    const twiml = new this.VoiceResponse();
    switch (callDto.Digits) {
      case '1':
        twiml.redirect('/api/calls/forwarding');
        break;
      case '2':
        twiml.redirect('/api/calls/voice-mail');
        break;
      default:
        twiml.say('Incorrect option. Ending Call.');
        twiml.redirect('/api/calls/end');
    }
    return twiml.toString();
  }

  callForwarding = async (callDto: CallDto) => {
    const call = await this.callRepo.findOneBy({ CallSid: callDto.CallSid });
    await this.callRepo.update(callDto.CallSid, {
      CallStatus: callDto.CallStatus,
    });
    const twiml = new this.VoiceResponse();
    twiml.dial(process.env.FORWARDING_NUMBER);
    twiml.redirect('/api/calls/end');
    return twiml.toString();
  };

  voiceMail = async (callDto: CallDto) => {
    await this.callRepo.update(callDto.CallSid, {
      CallStatus: callDto.CallStatus,
    });
    const twiml = new this.VoiceResponse();
    twiml.say('press # to end voicemail');

    twiml.record({
      playBeep: true,
      finishOnKey: '#',
      action: '/api/calls/end',
    });

    return twiml.toString();
  };

  endCall = async (callDto: CallDto) => {
    console.log('ended ', callDto);
    const call = await this.callRepo.findOneBy({ CallSid: callDto.CallSid });
    let duration = callDto.RecordingDuration;
    if (!duration) {
      duration = ((Date.now() - call.updatedAt.getTime()) / 1000).toString(); //calculate time in seconds
    }
    await this.callRepo.update(callDto.CallSid, {
      CallStatus: CallStatus.COMPLETED,
      Duration: duration,
      RecordingUrl: callDto.RecordingUrl,
    });
    const twiml = new this.VoiceResponse();
    twiml.say('Thank You for Calling.');
    twiml.hangup();

    return twiml.toString();
  };

  findAll() {
    return this.callRepo.find();
  }

  async findOne(CallSid: string) {
    const call = await this.callRepo.findOneBy({ CallSid });
    if (!call) {
      return responseHandler.fail(responseMessages.callNotFound);
    }
    return call;
  }

  async remove(CallSid: string) {
    const call = await this.callRepo.findOneBy({ CallSid });
    if (!call) {
      return responseHandler.fail(responseMessages.callNotFound);
    }
    this.callRepo.remove(call);
  }
}
