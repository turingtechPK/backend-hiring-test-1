import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
@Entity()
export class Calls {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  status: string;
  @Column({ type: 'int' })
  duration: number;
  @Column({ type: 'varchar' })
  audioFile: string;
  @Column({ type: 'varchar' })
  from: string;
  @Column({ type: 'varchar' })
  to: string;
  @Column({ type: 'varchar' })
  direction: string;
}
