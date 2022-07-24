"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTwilioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const twilio_dto_1 = require("./twilio.dto");
class UpdateTwilioDto extends (0, mapped_types_1.PartialType)(twilio_dto_1.CreateTwilioDto) {
}
exports.UpdateTwilioDto = UpdateTwilioDto;
//# sourceMappingURL=update-twilio.dto.js.map