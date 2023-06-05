import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CallDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  callFrom: string;

  @IsString()
  @IsNotEmpty()
  callTo: string;

  @IsNumber()
  @IsOptional()
  duration: string;

  @IsString()
  @IsOptional()
  recording_url: boolean;
}
