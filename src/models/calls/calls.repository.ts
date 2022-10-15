import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCallsDto } from './dto/create-calls.dto';
import { UpdateCallsDto } from './dto/update-calls.dto';
import { Calls } from './entities/calls.entity';

@Injectable()
export class CallsRepository {
  constructor(
    @Inject('CALLS_REPOSITORY')
    private callsRepository: Repository<Calls>,
  ) {}

  //Creates a new call object from the data recieved into the database.
  async create(createCallsDto: CreateCallsDto) {
    return await this.callsRepository.save(createCallsDto);
  }

  //Returns all the call history.
  async callHistory() {
    return await this.callsRepository.find();
  }

  //Returns all the call history for a specific number
  async callHistoryForACertainNumber(phoneNo: string) {
    return await this.callsRepository.find({ where: { to: phoneNo } });
  }
}
