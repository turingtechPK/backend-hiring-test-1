import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallsModule } from './models/calls/calls.module';
import { IvrModule } from './models/ivr/ivr.module';

@Module({
  imports: [IvrModule, CallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
