import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { RecordsSchema } from './records.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Record', schema: RecordsSchema }]),
  ],
  controllers: [CallsController],
  providers: [CallsService],
})
export class CallsModule {}
