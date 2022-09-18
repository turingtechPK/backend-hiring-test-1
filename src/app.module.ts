import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { DatabaseModule } from '@src/database/database.module';
import { CallsModule } from './calls/calls.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve('client/dist'),
    }),
    DatabaseModule,
    CallsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
