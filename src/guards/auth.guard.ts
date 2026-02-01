/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { user: any } = context
      .switchToHttp()
      .getRequest<Request & { user: any }>();

    const authorization = request.headers['authorization']?.split(' ')[1];

    if (!authorization) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const secretKey = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(authorization, {
        secret: secretKey,
      });
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid token', error });
    }
  }
}
