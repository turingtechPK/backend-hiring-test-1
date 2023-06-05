import { CallDto } from './call.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Call } from './call.schema';
import { Model } from 'mongoose';

@Injectable()
export class CallService {
  constructor(@InjectModel(Call.name) private callModel: Model<Call>) {}

  async getAll() {
    const calls = await this.callModel.find();
    return {
      result: calls.length,
      calls,
    };
  }

  async getOne(id: any) {
    const calls = await this.callModel.findById(id);
    return calls;
  }

  async updateOne(id: any, body: any) {
    const calls = await this.callModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      },
    );
    return calls;
  }
}
