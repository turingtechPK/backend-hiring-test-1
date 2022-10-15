import { Injectable } from '@nestjs/common';
import { RecordingDto } from '../recordings/dto/recording.dto';
import { CallsRepository } from './calls.repository';
import { UpdateCallsDto } from './dto/update-calls.dto';

@Injectable()
export class CallsService {
  constructor(private readonly callsRepository: CallsRepository) {}

  //This function takes out all the data needed from the recieved data after voicemail has been recorded and sends it further to be stored in the database.
  createAfterVoiceMailEnd(recordingDto: RecordingDto, startTime: number) {
    const duration = new Date().getTime() - startTime;
    return this.callsRepository.create({
      status: recordingDto.CallStatus,
      duration,
      direction: recordingDto.Direction,
      to: recordingDto.To,
      from: recordingDto.From,
      audioFile: recordingDto.RecordingUrl,
    });
  }

  //This function takes out all the data needed from the recieved data after call has ended and sends it further to be stored in the database.
  createAfterCallEnd(
    from: string,
    startTime: number,
    status: string,
    to: string,
  ) {
    const duration = new Date().getTime() - startTime;
    return this.callsRepository.create({
      status,
      duration,
      direction: 'inbound',
      to,
      from: from,
      audioFile: '',
    });
  }

  //Calls another function to get all the call history
  callHistory() {
    return this.callsRepository.callHistory();
  }

  //Calls another function to get all the call history for a specific number
  callHistoryForACertainNumber(id: string) {
    return this.callsRepository.callHistoryForACertainNumber(id);
  }
}
