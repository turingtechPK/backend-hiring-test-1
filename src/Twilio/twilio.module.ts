import { Module } from "@nestjs/common/decorators";
import { TwilioService } from "./twilio.service";

@Module({
    providers:[TwilioService],
    exports:[TwilioService]
})

export class Twilio{}