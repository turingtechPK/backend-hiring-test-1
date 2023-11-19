import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './shared/services/config/config.service';
import { QueryService } from './shared/services/query/query.service';
import { TwilioModule } from '@modules/twilio/twilio.module';
import { CallsModule } from '@modules/calls/calls.module';

const modules = [
  TwilioModule,
  CallsModule
]
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule,],
      useFactory: (configService: ConfigService) =>
        configService.typeOrmConfig,
      inject: [ConfigService],
    }),  
    ...modules
  ],
  controllers: [AppController],
  providers:[AppService, QueryService],
})
export class AppModule {}
