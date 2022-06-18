import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Call } from './calls/calls.entity';
import { CallsModule } from './calls/calls.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'us-cdbr-east-05.cleardb.net',
      username: 'b54f5d594aa91d',
      password: 'd0d2d0d4',
      database: 'heroku_87dac6eb6d58a87',
      entities: [Call],
      synchronize: false,
      dropSchema: false
    }
  ), CallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
