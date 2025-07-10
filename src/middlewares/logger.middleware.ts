import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Estas ejecutando un ${req.method} en ${req.originalUrl}`);
    next();
  }
}

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`Estas ejecutando un ${req.method} en ${req.originalUrl}`);
  next();
}
