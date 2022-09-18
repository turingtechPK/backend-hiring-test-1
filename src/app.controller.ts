import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/twmil-init')
export class AppController {
  constructor(private readonly twilioSeedService: AppService) {}
  @Get()
  initTWIML(): Promise<string> {
    return this.twilioSeedService.run();
  }
}
