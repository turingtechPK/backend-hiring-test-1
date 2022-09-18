import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/hello')
export class AppController {
  constructor(private readonly userSeedService: AppService) {}
  @Get()
  getHello(): string {
    return this.userSeedService.run();
  }
}
