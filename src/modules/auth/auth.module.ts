import { Module } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersRepository],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
