import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '@utils/logger/logger.middleware';
import { LoggerModule } from '@utils/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../../ormconfig';
import { CommonModule } from '@modules/common/common.module';
import { TwilioModule } from '@utils/twilio/twilio.module';
import { CallModule } from '@modules/call/call.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [AppService.envConfiguration()],
    }),
    TypeOrmModule.forRoot(ormconfig),
    LoggerModule,
    CommonModule,
    TwilioModule,
    CallModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
