import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Call } from './calls/calls.entity';
import { CallsModule } from './calls/calls.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'twillio_demo',
      entities: [Call],
      synchronize: false,
      dropSchema: false
    }
  ), CallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
