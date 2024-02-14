import { Module } from '@nestjs/common';
import { IvrController } from './ivr.controller';
import { IvrService } from './ivr.service';
import { MongooseModule } from '@nestjs/mongoose';
import Models from '../models'

@Module({
  controllers: [IvrController],
  providers: [IvrService],
  imports: [
    MongooseModule.forFeature([Models.Call])
  ]
})
export class IvrModule {}
