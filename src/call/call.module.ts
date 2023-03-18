import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Twilio } from "src/Twilio/twilio.module";
import { CallController } from "./call.controller";
import { CallSchema, VoicemailSchema } from "./call.model";
import { CallService } from "./call.service";

@Module({
    imports:[Twilio,
            MongooseModule.forFeature([{
                                            name:'Call',
                                            schema:CallSchema
                                        }
                                    ]),
            MongooseModule.forFeature([{
                                            name:'Voicemail',
                                            schema:VoicemailSchema
                                        }
                                    ])],
    
    controllers:[CallController],
    providers:[CallService],
})

export class CallModule {}
