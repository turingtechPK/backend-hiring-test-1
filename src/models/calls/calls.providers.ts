import { Calls } from './entities/calls.entity';
import { DataSource } from 'typeorm';

export const callsProviders = [
  {
    provide: 'CALLS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Calls),
    inject: ['DATABASE_CONNECTION'],
  },
];
