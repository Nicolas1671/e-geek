import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { credentials } from './auth.interface';
import { CreateUserDto } from '../users/dtos/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() credentials: credentials) {
    return this.authService.signIn(credentials);
  }

  @Post('signup')
  signUp(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signUp(CreateUserDto);
  }
}
