import { MiddlewareConsumer, Module } from '@nestjs/common';
import { IVRService } from './ivr.service';
import { IVRController } from './ivr.controller';
import { TwillioMiddleware } from 'src/twilio/middleware/twilio.middleware';

@Module({
  imports: [],
  controllers: [IVRController],
  providers: [IVRService],
})
export class IVRModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TwillioMiddleware);
  }
}
