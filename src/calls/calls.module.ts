import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './calls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  providers: [CallsService],
  controllers: [CallsController]
})
export class CallsModule {}
