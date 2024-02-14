import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from 'nestjs-twilio';
import { IvrModule } from './ivr/ivr.module';
@Module({
  imports: [
    ConfigModule.forRoot(), //parse env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URL'),
        autoIndex:true,
      }),
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService:ConfigService)=>({
        accountSid:configService.get('TWILIO_ACCOUNT_SID'),
        authToken:configService.get('TWILIO_AUTH_TOKEN')
      })
    }),
    IvrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
