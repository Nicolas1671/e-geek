import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { Request } from 'express';
import { credentials } from '../auth/auth.interface';

@Controller('users')
//@UseGuards(AuthGuard) // Apply the AuthGuard to all routes in this controller
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(@Query('name') name?: string) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    const users = await this.usersService.getUsers();
    if (!users) {
      throw new Error('Users not found');
    }
    const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return usersWithoutPassword;
  }

  @HttpCode(201)
  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(
    @Body() user: Omit<User, 'id'>,
    @Req() request: Request & { now: string },
  ) {
    console.log(request.now);
    return this.usersService.createUser(user);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(AuthGuard)
  findByCredentials(@Body() credentials: credentials) {
    return this.usersService.findByCredentials(credentials);
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: User,
    @Headers('token') token?: string,
  ) {
    console.log(token);
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUser() {
    return this.usersService.deleteUser();
  }

  @HttpCode(200)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(Number(id));
    if (!user) {
      throw new Error('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

/* @Get('message')
getMessage(@Res() response: Response) {
  response.status(200).send({
    message: 'Hello, this is a message from the UsersController!',
  });
} */

/* @Get('request')
getRequest(@Req() request: Request) {
  console.log(request);
  return 'Hello, this is a message from the UsersController!',
}
 */
