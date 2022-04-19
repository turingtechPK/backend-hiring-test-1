import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CallDocument = Call & Document;

@Schema()
export class Call {
  @Prop({required: true})
  callSid: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  recordingUrl: string;

  @Prop()
  callDuration: number;

  @Prop()
  callDirection: string;

  @Prop()
  caller: string;

  @Prop()
  callStatus: string;

  @Prop({default: new Date()})
  timeStamp: Date
}

export const CallSchema = SchemaFactory.createForClass(Call);
