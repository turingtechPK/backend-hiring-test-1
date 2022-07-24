import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from 'src/models/history.model';
import { ModelsModule } from 'src/models/models.module';

@Module({
  imports: [
    ModelsModule,
    MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
  ],
  controllers: [TwilioController],
  providers: [TwilioService],
})
export class TwilioModule {}
