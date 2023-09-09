import {
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../../dbconfig';
import { TwilioModule } from '@utils/twilio/twilio.module';
import { CallModule } from '@modules/call/call.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [AppService.envConfiguration()],
    }),
    TypeOrmModule.forRoot(ormconfig),
    TwilioModule,
    CallModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
