import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule as CallsModule } from './twilio/twilio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsModule } from './models/models.module';
import { TwilioModule } from 'nestjs-twilio';
import * as dotenv from 'dotenv';

dotenv.config();

// Database
const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const DB = MongooseModule.forRoot(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.5wlav.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
);

// Twilio
const { TWILIO_SID, TWILIO_AUTH_TOKEN } = process.env;

const Twilio = TwilioModule.forRoot({
  accountSid: TWILIO_SID,
  authToken: TWILIO_AUTH_TOKEN,
});

@Module({
  imports: [DB, Twilio, ModelsModule, CallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
