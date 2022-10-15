import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../config/database/database.module';
import { CallsService } from './calls.service';
import { CallsRepository } from './calls.repository';
import { callsProviders } from './calls.providers';
import { CallsController } from './calls.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CallsController],
  providers: [CallsService, CallsRepository, ...callsProviders],
  exports: [CallsService, CallsRepository, ...callsProviders],
})
export class CallsModule {}
