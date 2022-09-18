import { ApiProperty } from '@nestjs/swagger';

export class CallDto {
  @ApiProperty()
  CallSid: string;

  @ApiProperty()
  CallStatus: string;

  @ApiProperty()
  Called: string;

  @ApiProperty()
  Caller: string;

  @ApiProperty()
  Direction: string;

  @ApiProperty()
  From: string;

  @ApiProperty()
  To: string;

  @ApiProperty({ required: false })
  FinishedOnKey?: string;

  @ApiProperty({ required: false })
  Digits?: string;

  @ApiProperty({ required: false })
  msg?: string;

  @ApiProperty({ required: false })
  RecordingDuration?: string;

  @ApiProperty({ required: false })
  RecordingSid?: string;

  @ApiProperty({ required: false })
  RecordingUrl?: string;
}
