import { PrimaryColumn, Column,  Entity } from 'typeorm';
import { CallStates } from '../../call-state/call-states.enum';

@Entity()
export class Call {
    @PrimaryColumn('text')
    id: string;

    @Column()
    callerPhoneNumber: string;

    @Column({
        type: 'int'
    })
    state: CallStates;

    @Column({
        nullable: true
    })
    ivrRespone: string;


    @Column({
        nullable: true,
    })
    recordingsUrl: string;

}
