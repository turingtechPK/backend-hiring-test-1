import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CallController } from "./controllers/call.controller"
import { AppService } from './app.service';
import { CallService } from './services/call.service';

@Module({
  imports: [],
  controllers: [AppController, CallController],
  providers: [AppService, CallService],
})
export class AppModule { }
