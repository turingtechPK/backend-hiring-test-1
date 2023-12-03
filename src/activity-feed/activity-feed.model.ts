import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ActivityFeed {
    @Prop({
        required: true,
        type: String,
    })
    sid: string;

    @Prop({ required: true, type: String })
    status: string;

    @Prop({ required: true, type: String })
    from: string;

    @Prop({ required: true, type: String })
    to: string;
    //Duration and voiceMailUrl are not available initially so setting as optional
    @Prop({ required: false, type: String, default: null })
    duration?: string;

    @Prop({ required: false, type: String, default: null })
    voiceMailUrl?: string;

}

export const ActivityFeedModel = SchemaFactory.createForClass(ActivityFeed);