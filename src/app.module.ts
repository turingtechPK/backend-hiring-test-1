import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallModule } from './call/call.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CallModule,
    MongooseModule.forRoot(
      'mongodb+srv://omar:safePKPass123@cluster0.wybubil.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `config/${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
