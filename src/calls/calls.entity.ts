
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'calls'})
export class Call {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    call_sid: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({ length: 20 })
    status: string;

    @Column({nullable: true})
    duration?: number;

    @Column({nullable: true})
    recording_url?: string;

    @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}