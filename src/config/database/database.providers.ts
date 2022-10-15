import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASR_USERNAME,
        password: process.env.DATBASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../../models/**/entities/*.entity{.ts,.js}'],
        synchronize: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      });
      return dataSource.initialize();
    },
  },
];
