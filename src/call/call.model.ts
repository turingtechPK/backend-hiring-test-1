import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Call {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  sid: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  voiceMailRecordingUrl: string;

  @Prop()
  status: string;
}

export type callDocument = Call & Document;
const CallSchema = SchemaFactory.createForClass(Call);
export { CallSchema };
