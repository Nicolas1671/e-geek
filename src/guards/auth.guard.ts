import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validateRequest(request: Request) {
  const authorization = request.headers['authorization'];
  return authorization === 'Basic <email>:<password>';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    return validateRequest(request);
  }
}
