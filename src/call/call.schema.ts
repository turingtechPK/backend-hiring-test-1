import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CallDocumentType = Call & Document;

@Schema({ timestamps: true })
export class Call {
  @Prop()
  sid: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  voiceMail: boolean;

  @Prop()
  voiceMailURL: string;

  @Prop()
  status: string;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CallSchema = SchemaFactory.createForClass(Call);
