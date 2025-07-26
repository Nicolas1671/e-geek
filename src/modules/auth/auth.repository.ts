import { Injectable } from '@nestjs/common';
import { credentials } from './auth.interface';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthRepository {
  constructor(private usersRepository: UsersRepository) {}
  async login(credentials: credentials) {
    await this.usersRepository.findByCredentials(credentials);
    return credentials;
  }
}
