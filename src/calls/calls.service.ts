import { Injectable } from '@nestjs/common';
import { TwilioService } from 'src/twilio/twilio.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Call } from './entities/call.entity';
import { CallStates } from 'src/call-state/call-states.enum';

const TwilioStatusMapping = {
  'ringing': CallStates.INCOMING,
  'in-progress': CallStates.IN_CALL,
  'completed': CallStates.FINISHED
}

@Injectable()
export class CallsService {
  constructor(private twilioService:TwilioService, @InjectRepository(Call) private callsRepository: Repository<Call>){}
  async create(createCallDto: CreateCallDto) {
    // create a Call object 
    const newCall = await this.callsRepository.create({
      id: createCallDto.CallSid,
      callerPhoneNumber: createCallDto.Caller,
      state:TwilioStatusMapping[createCallDto.CallStatus],
    })
    this.callsRepository.save(newCall)
    .catch((err) => {
      console.log(err.message);
    })
  }

  

  update(id: string, updateCallDto: UpdateCallDto) {
    this.callsRepository.update(id, updateCallDto)
  }



  handleIncomingCall(createCallDto: CreateCallDto) {
    this.create(createCallDto);
    return this.twilioService.handleIncomingCall();
  }

  forwardCall( callId: string){
    this.update(callId,{
      state: CallStates.FORWARDED
    })
    return this.twilioService.forwardCall();
  }


  handleIvr = (callId: string, selectedDigit: string) =>{
    this.update(callId, {
      ivrRespone: selectedDigit,
      state: CallStates.IN_CALL
    })
    return this.twilioService.handleIvr(selectedDigit);
  }

  handleRecordingStatusUpdate = (callId:string, recordingStatus: string, recordingUrl: string) => {
    if(recordingStatus == 'completed'){
      this.update(callId,{
        recordingsUrl: recordingUrl
      })
    }
  }

  handleVoicemail = (callId: string) => {
    this.update(callId, {
      state: CallStates.VOICEMAIL
    })
    return this.twilioService.handleVoiceMail();
  }

  goodbye = (callId:string) =>{
    this.update(callId, {
      state: CallStates.FINISHED
    })
    return this.twilioService.goodbye();
  }
}
