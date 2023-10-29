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
exports.CallController = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
let CallController = class CallController {
    constructor(callService) {
        this.callService = callService;
    }
    handleIncomingCall(response) {
        const twiml = this.callService.handleIncomingCall();
        response.type('text/xml');
        response.send(twiml.toString());
    }
    async handleGatherInput(body, response) {
        const twiml = await this.callService.handleGatherInput(body.Digits);
        response.type('text/xml');
        response.send(twiml.toString());
    }
    async handleVoicemail(voiceMailData, res) {
        const twiml = await this.callService.saveVoiceMail(voiceMailData);
        res.set('Content-Type', 'text/xml');
        res.send(twiml.toString());
    }
    async getCallLogById(id) {
        return await this.callService.getCallLogById(id);
    }
    async getCallLog() {
        return await this.callService.getAllCallLogs();
    }
};
exports.CallController = CallController;
__decorate([
    (0, common_1.Post)('incoming'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CallController.prototype, "handleIncomingCall", null);
__decorate([
    (0, common_1.Post)('gather'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "handleGatherInput", null);
__decorate([
    (0, common_1.Post)('voicemail'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "handleVoicemail", null);
__decorate([
    (0, common_1.Get)('/call/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getCallLogById", null);
__decorate([
    (0, common_1.Get)('/call/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getCallLog", null);
exports.CallController = CallController = __decorate([
    (0, common_1.Controller)('call'),
    __metadata("design:paramtypes", [call_service_1.CallService])
], CallController);
//# sourceMappingURL=call.controller.js.map