import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallModule } from './call/call.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TwilioModule } from './twilio/twilio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CallModule,
    TwilioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
