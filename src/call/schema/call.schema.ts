import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Call extends Document {
  @Prop({ required: true, type: String })
  accountSid: string;

  @Prop({ required: true, type: String })
  callSid: string;

  @Prop({ required: true, type: String })
  called: string;

  @Prop({ required: true, type: String })
  caller: string;

  @Prop({ type: Number })
  action: number;

  @Prop({ required: false, type: Number })
  duration: number;

  @Prop({ required: false, type: String })
  voiceMailLink: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);
