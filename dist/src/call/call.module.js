"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModule = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
const call_controller_1 = require("./call.controller");
const twilio_module_1 = require("../twilio/twilio.module");
const mongoose_1 = require("@nestjs/mongoose");
const call_model_1 = require("./call.model");
let CallModule = class CallModule {
};
exports.CallModule = CallModule;
exports.CallModule = CallModule = __decorate([
    (0, common_1.Module)({
        imports: [
            twilio_module_1.TwilioModule,
            mongoose_1.MongooseModule.forFeature([{ name: call_model_1.Call.name, schema: call_model_1.CallSchema }]),
        ],
        providers: [call_service_1.CallService],
        controllers: [call_controller_1.CallController],
    })
], CallModule);
//# sourceMappingURL=call.module.js.map