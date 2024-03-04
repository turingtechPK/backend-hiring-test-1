import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallsModule } from './calls/calls.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './calls/entities/call.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }), 
  TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "twilio-project",
    synchronize: true,
    autoLoadEntities: true
}),
  CallsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
