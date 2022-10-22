import { Injectable } from '@nestjs/common';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Twilio } from 'twilio';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

@Injectable()
export class CallsService {
  private twilioClient: Twilio;

  constructor(
    @InjectRepository(Call) private callRepository: Repository<Call>,
  ) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async receveCall(createCallDto: CreateCallDto, res: any, req) {
    const twiml = new VoiceResponse();
    // twiml.say('Hello press 1 to redirect call to personal number or press 2 to record a voice message')
    res.set('Content-Type', 'text/xml');
    // res.send(twiml.toString());
    const createdCall = this.callRepository.create({
      status: 'call',
      duration: '',
      link: 'linked to saved voice mail',
      caller: 'caller sid',
    });
    await this.callRepository.save(createdCall); 
    return true;
  }

  sendCall() {
    this.twilioClient.calls.create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      from: '+923365543872',
      to: '+923365543872',
    }, (err, call) => {
      if (err) {
        console.log(err)
      } else {
        console.log(call.sid)
      }
    });
    return true
  }

}
