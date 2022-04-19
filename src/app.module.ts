import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config'
import { Call, CallSchema } from './schemas/call.schema';

@Module({
  imports: [MongooseModule.forRoot(config.MONGODB_URI), 
    MongooseModule.forFeature([{name: Call.name, schema: CallSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
