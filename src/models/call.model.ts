import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IRecording } from 'src/Interfaces';
import { toJSON } from 'src/plugins';

@Schema()
export class Call {
  @Prop()
  caller: string;

  @Prop()
  caller_country: string;

  @Prop()
  called_to: string;

  @Prop()
  called_to_country: string;

  @Prop()
  call_duration: number;

  @Prop()
  CallSid: string;

  @Prop({ type: Object })
  Recording: IRecording;

  @Prop()
  Duration: string;
}

const CallSchema = SchemaFactory.createForClass(Call);
CallSchema.plugin(toJSON);
export { CallSchema };
