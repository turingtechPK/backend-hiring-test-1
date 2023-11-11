import { Module } from '@nestjs/common';
import { CallLogService } from './calllog.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CallLogController } from './calllog.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CallLogController],
  providers: [CallLogService],
  exports: [CallLogService],
})
export class CalllogModule {}
