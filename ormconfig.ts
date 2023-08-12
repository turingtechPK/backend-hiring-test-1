import { DataSourceOptions } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/src/**/*.entity.{ts,js}'],
    synchronize: true,
    extra: {
      max: 25,
    },
};
export default config;
