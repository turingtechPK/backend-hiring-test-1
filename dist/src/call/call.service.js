"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const Twilio = require("twilio");
const twilio_service_1 = require("../twilio/twilio.service");
const call_model_1 = require("./call.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CallService = class CallService {
    constructor(callModel, twilioService) {
        this.callModel = callModel;
        this.twilioService = twilioService;
    }
    async handleIncomingCall() {
        try {
            const twiml = new Twilio.twiml.VoiceResponse();
            const gather = twiml.gather({
                input: ['dtmf'],
                numDigits: 1,
                action: '/call/gather',
            });
            gather.say({ voice: 'woman', language: 'en-US' }, 'Hi thanks for calling. For direct call press 1. For sending a voicemail, press 2.');
            twiml.redirect('/call/incoming');
            return twiml;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async handleGatherInput(digits) {
        try {
            const twiml = new Twilio.twiml.VoiceResponse();
            switch (digits) {
                case '1': {
                    twiml.say({ voice: 'woman', language: 'en-US' }, 'We are redirecting you to the agent');
                    const dialNumber = this.twilioService.configService.get('twilio.callToNumber');
                    const response = await this.twilioService.dialNumber(dialNumber);
                    if (!response) {
                        throw new Error('Failed to dial number');
                    }
                    const call = new this.callModel({
                        sid: response.sid,
                        status: response.status,
                    });
                    await call.save();
                    break;
                }
                case '2': {
                    twiml.say({ voice: 'woman', language: 'en-US' }, 'Please leave a one minute voicemail after the beep.');
                    twiml.record({
                        action: '/call/voicemail',
                        maxLength: 60,
                        playBeep: true,
                    });
                    break;
                }
                default:
                    twiml.say({ voice: 'woman', language: 'en-US' }, "Sorry, I don't understand that choice.");
                    twiml.pause();
                    twiml.redirect('/call/incoming');
                    break;
            }
            return twiml;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async saveVoiceMail(voiceMailData) {
        try {
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say({ voice: 'woman', language: 'en-US' }, 'Thank you for leaving a voicemail.');
            const call = new this.callModel({
                sid: voiceMailData.CallSid,
                duration: voiceMailData.RecordingDuration,
                voiceMailRecordingUrl: voiceMailData.RecordingUrl,
                status: 'completed',
            });
            await call.save();
            return twiml;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getCallLogById(id) {
        try {
            const callLog = await this.callModel.findById(id);
            if (!callLog) {
                throw new common_1.NotFoundException('This is no call log with this Id');
            }
            return callLog;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getAllCallLogs() {
        try {
            return await this.callModel.find();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.CallService = CallService;
exports.CallService = CallService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(call_model_1.Call.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        twilio_service_1.TwilioService])
], CallService);
//# sourceMappingURL=call.service.js.map