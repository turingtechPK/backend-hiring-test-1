import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IVRService } from './ivr.service';
import { IVRController } from './ivr.controller';
import { TwillioMiddleware } from 'src/twilio/middleware/twilio.middleware';
import { CalllogModule } from 'src/calllog/calllog.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    CalllogModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [IVRController],
  providers: [IVRService],
  exports: [IVRService],
})
export class IVRModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TwillioMiddleware);
  }
}
