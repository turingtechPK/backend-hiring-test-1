import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from './twilio/twilio.module';
import { CallModule } from './call/call.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CallSchema } from './call/call.model';
// import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: process.env.MONGO_DB_URL,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Call', schema: CallSchema }]),
    TwilioModule,
    CallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
