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
exports.TwilioService = void 0;
const Twilio = require("twilio");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const moment = require("moment");
let TwilioService = class TwilioService {
    constructor(HistoryModel) {
        this.HistoryModel = HistoryModel;
    }
    async recieveCall(body) {
        try {
            await new this.HistoryModel({
                sid: body.CallSid,
                status: body.CallStatus,
                to: body.To,
                from: body.From,
            }).save();
            const twiml = new Twilio.twiml.VoiceResponse();
            const gather = twiml.gather({
                action: '/twilio/respond-to-dialpad',
                numDigits: 1,
                method: 'POST',
            });
            gather.say('Press 1 for call forwarding. Press 2 for voice message.');
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async respondToDialpad(body) {
        try {
            await this.HistoryModel.findOneAndUpdate({ sid: body.CallSid }, { status: body.CallStatus });
            const twiml = new Twilio.twiml.VoiceResponse();
            switch (body.Digits) {
                case '1':
                    twiml.redirect('/twilio/forward-call');
                    break;
                case '2':
                    twiml.redirect('/twilio/record-voice-message');
                    break;
                default:
                    twiml.say('Incorrect option. Endingcall Call.');
                    twiml.redirect('/twilio/save-call');
            }
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async forwardCall() {
        try {
            const { CALL_FORWARD_NUMBER } = process.env;
            const twiml = new Twilio.twiml.VoiceResponse();
            if (!CALL_FORWARD_NUMBER) {
                twiml.say('There is no call forward number');
                twiml.hangup();
            }
            else {
                twiml.say('Forwarding call...');
                twiml.dial(CALL_FORWARD_NUMBER);
            }
            twiml.redirect('/twilio/save-call');
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveCall(body) {
        try {
            const history = await this.HistoryModel.findOne({ sid: body.CallSid }, { createdAt: 1 });
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say(' Your call is saved.');
            twiml.hangup();
            await this.HistoryModel.findOneAndUpdate({
                sid: body.CallSid,
            }, {
                status: 'Finished',
                duration: moment().unix() - moment(history.createdAt).unix(),
            });
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async recordVoiceMessage() {
        try {
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say('Record your voice message. press # to end');
            twiml.record({
                playBeep: true,
                finishOnKey: '#',
                action: '/twilio/save-voice-message',
            });
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async saveVoiceMessage(body) {
        try {
            const twiml = new Twilio.twiml.VoiceResponse();
            twiml.say('Voice message is saved');
            twiml.hangup();
            await this.HistoryModel.findOneAndUpdate({
                sid: body.CallSid,
            }, {
                voiceMail: true,
                duration: body.RecordingDuration,
                voiceMailUrl: body.RecordingUrl,
                status: 'Finished',
            });
            return twiml.toString();
        }
        catch (error) {
            console.error(error);
        }
    }
    async fetchHistory(query) {
        try {
            const { limit = 10, offset = 0 } = query;
            const history = await this.HistoryModel.find().skip(offset).limit(limit);
            const rowsCount = await this.HistoryModel.count();
            return {
                success: 1,
                message: 'Success',
                data: {
                    rows: history || [],
                    rowsCount: rowsCount || 0,
                },
            };
        }
        catch (error) {
            console.error(error);
            return {
                success: 0,
                message: 'Error occured while processing request',
                data: {
                    rows: [],
                    rowsCount: 0,
                },
            };
        }
    }
};
TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('History')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TwilioService);
exports.TwilioService = TwilioService;
//# sourceMappingURL=twilio.service.js.map