import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { credentials } from './auth.interface';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}
  signIn(credentials: credentials) {
    return this.authRepository.signIn(credentials);
  }

  signUp(CreateUserDto: CreateUserDto) {
    return this.authRepository.signUp(CreateUserDto);
  }
}
