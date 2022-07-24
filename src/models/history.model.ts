import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type HistoryDocument = History & Document;

@Schema({ timestamps: true })
export class History {
  @Prop({ required: true })
  sid: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ default: 0 })
  duration: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: false })
  voiceMail: boolean;

  @Prop()
  voiceMailUrl: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);

export interface HistoryInterface {
  _id?: ObjectId;
  sid: string;
  from: string;
  to: string;
  status: string;
  voiceMail: boolean;
  voiceMailUrl: string;
  createdAt: string;
}
