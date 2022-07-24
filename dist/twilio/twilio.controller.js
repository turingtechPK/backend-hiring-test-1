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
exports.TwilioController = void 0;
const common_1 = require("@nestjs/common");
const twilio_service_1 = require("./twilio.service");
const TwilioDTO = require("./dto");
let TwilioController = class TwilioController {
    constructor(twilioService) {
        this.twilioService = twilioService;
    }
    recieveCall(body) {
        return this.twilioService.recieveCall(body);
    }
    respondToDialpad(body) {
        return this.twilioService.respondToDialpad(body);
    }
    saveCall(body) {
        return this.twilioService.saveCall(body);
    }
    forwardCall() {
        return this.twilioService.forwardCall();
    }
    recordVoiceMessage() {
        return this.twilioService.recordVoiceMessage();
    }
    saveVoiceMessage(body) {
        return this.twilioService.saveVoiceMessage(body);
    }
    fetchHistory(query) {
        return this.twilioService.fetchHistory(query);
    }
};
__decorate([
    (0, common_1.Post)('recieve-call'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwilioDTO.RecieveCall]),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "recieveCall", null);
__decorate([
    (0, common_1.Post)('respond-to-dialpad'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwilioDTO.RespondToDialpad]),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "respondToDialpad", null);
__decorate([
    (0, common_1.Post)('save-call'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwilioDTO.SaveCall]),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "saveCall", null);
__decorate([
    (0, common_1.Post)('forward-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "forwardCall", null);
__decorate([
    (0, common_1.Post)('record-voice-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "recordVoiceMessage", null);
__decorate([
    (0, common_1.Post)('save-voice-message'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwilioDTO.SaveVoiceMessage]),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "saveVoiceMessage", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TwilioDTO.FetchHistory]),
    __metadata("design:returntype", void 0)
], TwilioController.prototype, "fetchHistory", null);
TwilioController = __decorate([
    (0, common_1.Controller)('twilio'),
    __metadata("design:paramtypes", [twilio_service_1.TwilioService])
], TwilioController);
exports.TwilioController = TwilioController;
//# sourceMappingURL=twilio.controller.js.map