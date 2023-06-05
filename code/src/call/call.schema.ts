import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Call extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  callFrom: string;

  @Prop({ required: true })
  callTo: string;

  @Prop()
  duration: number;

  @Prop()
  recording_url?: string;

  @Prop()
  startedAt: Date;

  @Prop()
  finishedAt: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);
