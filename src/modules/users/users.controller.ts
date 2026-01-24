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
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  //HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
//import { User } from './user.interface';
import { AuthGuard } from 'src/guards/auth.guard';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { Request } from 'express';
import { credentials } from '../auth/auth.interface';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Users } from 'src/entities/users.entity';

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
    /* const usersWithoutPassword = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }); */
    return users;
  }

  @HttpCode(201)
  @Post()
  @UseInterceptors(DateAdderInterceptor)
  createUser(
    @Body() user: Omit<CreateUserDto, 'id'>,
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Users,
    @Headers('token') token?: string,
  ) {
    console.log(token);
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @HttpCode(200)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    /* const { password, ...userWithoutPassword } = user;
    return userWithoutPassword; */
    return user;
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

/* try {
  throw new Error('This is a sample error');
} catch (error) {
  throw new HttpException(
    {
      status: 500,
      error: 'This is a sample error',
    },
    500
  )  
} */
