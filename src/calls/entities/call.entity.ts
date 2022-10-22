import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('calls')
export class Call {
  @ObjectIdColumn()
  _id: string;

  @Column()
  status: string;

  @Column()
  duration: string;

  @Column({ unique: true })
  link: string;

  @Column()
  caller: string;
}