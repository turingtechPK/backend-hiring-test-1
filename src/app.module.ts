import { Module } from '@nestjs/common';
import { CallModule } from './call/call.module';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: 
    [ CallModule, 
      MongooseModule.forRoot(process.env.MONGODB_URI)
    ],
})

export class AppModule {
}
