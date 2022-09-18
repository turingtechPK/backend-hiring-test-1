import { Module } from '@nestjs/common';
import { CallsService } from '@src/calls/calls.service';
import { CallsController } from '@src/calls/calls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallEntity } from '@src/calls/entities/call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CallEntity])],
  controllers: [CallsController],
  providers: [CallsService],
})
export class CallsModule {}
