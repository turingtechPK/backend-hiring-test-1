import { PartialType } from '@nestjs/mapped-types';
import { Call } from '../entities/call.entity';

export class UpdateCallDto extends PartialType(Call) {}
