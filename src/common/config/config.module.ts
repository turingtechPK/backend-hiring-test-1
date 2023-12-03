import { Module } from '@nestjs/common';

import { ConfigService } from './config.service'; //I like to have my own config service for more control
//I use config service to detect whether the application has all required envs and does not have unwanted envs
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService('.env'),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
