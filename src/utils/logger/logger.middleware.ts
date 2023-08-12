import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '@utils/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log(`| ${req.method} | ${req.url}`);
    next();
  }
}
