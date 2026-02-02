import { BadRequestException, Injectable } from '@nestjs/common';
import { credentials } from './auth.interface';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  constructor(
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
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
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return { message: 'Sign-in successful', token };
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
