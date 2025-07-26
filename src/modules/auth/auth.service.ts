import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { credentials } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  login(credentials: credentials) {
    return this.authRepository.login(credentials);
  }
}
