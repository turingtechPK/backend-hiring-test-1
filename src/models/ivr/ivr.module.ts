import { Module } from '@nestjs/common';
// import { DatabaseModule } from '../../config/database/database.module';
import { IvrService } from './ivr.service';
// import { IvrRepository } from './ivr.repository';
import { IvrController } from './ivr.controller';
import { CallsModule } from '../calls/calls.module';

@Module({
  imports: [CallsModule],
  controllers: [IvrController],
  providers: [IvrService],
  exports: [IvrService],
})
export class IvrModule {}
