import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Model } from "mongoose";
import { TwilioService } from "src/Twilio/twilio.service";
import { Call, Voicemail } from "./call.model";
require('dotenv').config();

@Injectable()
export class CallService{
    constructor(private twilioService:TwilioService,
                @InjectModel(Call.name) private callModel:Model<Call>,
                @InjectModel(Voicemail.name) private voiceModel:Model<Voicemail>){}


    getAllCalls(){
        return this.callModel.find().populate('voicemail').exec();  
    }

    getCallByID(id){
        return this.callModel.findOne({
            sid : id
        });
    }

    receiveIncomingCall(){
        return this.twilioService.receiveIncomingCall();
    }

    handleIncomingCall(req){
        this.saveCallLog(req.body.CallSid);
        return this.twilioService.handleIncomingCall(req);
    }

    saveCallLog(CallSid) {
        this.twilioService.getCallDetails(CallSid)
            .then(call => 
                this.callModel.create({
                    sid:call.sid,
                    status:call.status,
                    callFrom:call.from,
                    callTo:call.to,
                    duration:call.duration,
                    startedAt:call.startTime,
                    finishedAt:call.endTime,
                    voicemail:null,
                })
        );
    }

    handleStatusChange(req){
        this.twilioService.getCallDetails(req.body.CallSid)
            .then(call => this.updateCall(call));
        return "Handling Status Change"
    }

    async updateCall(call){
        await this.callModel.findOneAndUpdate(
            { 
              sid: call.sid 
            },
            { 
              $set: { 
                duration: call.Duration, 
                status: call.status,
                finishedAt: call.endTime 
              } 
            },
            { 
              new: true
            }
          ).exec();
    }

    handleVoiceMailRecording(req){
        this.saveVoiceMailToDB(req.body);
        return this.twilioService.endVoiceMailRecoring();
    }

    async saveVoiceMailToDB(requestBody) {
        const voiceMail = await this.voiceModel.create({
            RecordingSid:requestBody.RecordingSid,
            RecordingUrl:requestBody.RecordingUrl,
            RecordingDuration:requestBody.RecordingDuration
        })

        await this.callModel.findOneAndUpdate(
            { 
              sid: requestBody.CallSid 
            },
            { 
              $set: { 
                voicemail:voiceMail.id
              } 
            },
            { 
              new: true
            }
          ).exec();
    }
}