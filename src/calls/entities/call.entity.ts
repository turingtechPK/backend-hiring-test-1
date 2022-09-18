import { ApiProperty } from '@nestjs/swagger';
import { CallStatus } from '@src/common/responses/enums';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('call', { schema: 'public' })
export class CallEntity extends BaseEntity {
  @ApiProperty()
  @Column({ primary: true })
  CallSid: string;

  @ApiProperty()
  @Column({ enum: CallStatus })
  CallStatus: string;

  @ApiProperty()
  @Column()
  Called: string;

  @ApiProperty()
  @Column()
  Caller: string;

  @ApiProperty()
  @Column()
  Direction: string;

  @ApiProperty()
  @Column()
  From: string;

  @ApiProperty()
  @Column()
  To: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ nullable: true })
  Duration: string;

  @ApiProperty({ required: false, nullable: true })
  @Column({ nullable: true })
  RecordingUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
