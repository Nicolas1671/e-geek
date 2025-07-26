import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { credentials } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  login(@Body() credentials: credentials) {
    return this.authService.login(credentials);
  }
}
