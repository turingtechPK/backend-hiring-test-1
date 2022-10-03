import { Module } from '@nestjs/common';

import { CallsModule } from './calls/calls.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CallsModule,
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'calls' }),
  ],
})
export class AppModule {}
