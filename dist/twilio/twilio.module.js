"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioModule = void 0;
const common_1 = require("@nestjs/common");
const twilio_service_1 = require("./twilio.service");
const twilio_controller_1 = require("./twilio.controller");
const mongoose_1 = require("@nestjs/mongoose");
const history_model_1 = require("../models/history.model");
const models_module_1 = require("../models/models.module");
let TwilioModule = class TwilioModule {
};
TwilioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            models_module_1.ModelsModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'History', schema: history_model_1.HistorySchema }]),
        ],
        controllers: [twilio_controller_1.TwilioController],
        providers: [twilio_service_1.TwilioService],
    })
], TwilioModule);
exports.TwilioModule = TwilioModule;
//# sourceMappingURL=twilio.module.js.map