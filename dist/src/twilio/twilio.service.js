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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioService = void 0;
const common_1 = require("@nestjs/common");
const Twilio = require("twilio");
const config_1 = require("@nestjs/config");
let TwilioService = class TwilioService {
    constructor(configService) {
        this.configService = configService;
        this.twilioClient = new Twilio.Twilio(this.configService.get('twilio.accountSid'), this.configService.get('twilio.authToken'), {
            autoRetry: true,
            maxRetries: 3,
            logLevel: 'debug',
        });
    }
    async dialNumber(to) {
        try {
            const response = await this.twilioClient.calls.create({
                url: this.configService.get('twilio.createCallUrl'),
                to,
                from: this.configService.get('twilio.callFromNumber'),
            });
            return response.sid;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async showCallLogs() {
        try {
            return await this.twilioClient.calls.list({ limit: 20 });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.TwilioService = TwilioService;
exports.TwilioService = TwilioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TwilioService);
//# sourceMappingURL=twilio.service.js.map