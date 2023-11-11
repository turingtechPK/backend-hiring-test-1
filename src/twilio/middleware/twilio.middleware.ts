import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { webhook } from 'twilio';

@Injectable()
export class TwillioMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    webhook({ validate: false });
    next();
  }
}
