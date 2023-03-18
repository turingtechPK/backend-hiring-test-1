import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Voicemail extends Document{

    @Prop({ required: true })
    RecordingSid: string;    

    @Prop({ required: true })
    RecordingUrl: string;

    @Prop({ required: true })
    RecordingDuration: number;
}

@Schema()
export class Call extends Document{
    @Prop({ required: true })
    sid: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    callFrom: string

    @Prop({ required: true })
    callTo: string

    @Prop()
    duration: number;

    @Prop()
    startedAt: Date;

    @Prop()
    finishedAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'Voicemail' })
    voicemail: Voicemail;
}

export const VoicemailSchema = SchemaFactory.createForClass(Voicemail);
export const CallSchema = SchemaFactory.createForClass(Call);

