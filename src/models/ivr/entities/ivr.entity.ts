import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Ivr {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
