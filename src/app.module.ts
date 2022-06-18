import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Call } from './calls/calls.entity';
import { CallsModule } from './calls/calls.module';
import 'dotenv/config';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      ...(process.env.DB_PORT && {port: parseInt(process.env.DB_PORT)}),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Call],
      synchronize: false,
      dropSchema: false
    }
  ), CallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
