import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IVRModule } from './ivr/ivr.module';
import { CallModule } from './call/call.module';

@Module({
  imports: [IVRModule, CallModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
