/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { credentials } from './auth.interface';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(private usersRepository: UsersRepository) {}
  async signIn(credentials: credentials) {
    const user = await this.usersRepository.findByEmail(credentials.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.credential.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    return { message: 'Sign-in successful' };
  }
  async signUp(CreateUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByEmail(CreateUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Error hashing password');
    }
    await this.usersRepository.createUser({
      ...CreateUserDto,
      password: hashedPassword,
    });
    return { message: 'User created successfully' };
  }
}
