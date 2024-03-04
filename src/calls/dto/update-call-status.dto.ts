import { PartialType } from '@nestjs/mapped-types';
import { CreateCallDto } from './create-call.dto';

export class UpdateCallStatusDto extends PartialType(CreateCallDto) {
    Digits: string;
    RecordingUrl: string;
    RecordingStatus: string;
}