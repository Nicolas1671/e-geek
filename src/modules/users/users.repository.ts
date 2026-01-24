import { Injectable } from '@nestjs/common';
//import { User } from './user.interface';
import { credentials } from '../auth/auth.interface';
import { DataSource } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UsersRepository {
  /*   private users: User[] = [
    {
      id: 1,
      name: 'Nicolas',
      email: 'Nicolas@mail.com',
      state: 'available',
      password: '123456',
    },
    {
      id: 2,
      name: 'Juan',
      email: 'Juan@mail.com',
      state: 'available',
      password: '123456',
    },
    {
      id: 3,
      name: 'Pedro',
      email: 'Pedro@mail.com',
      state: 'available',
      password: '123456',
    },
  ];*/
  constructor(private dataSource: DataSource) {}

  async getUsers() {
    return this.dataSource.getRepository(Users).find();
  }
  async getUserById(id: string): Promise<Users | null> {
    return this.dataSource.getRepository(Users).findOne({ where: { id } });
  }
  async getUserByName(name: string): Promise<Users | null> {
    return this.dataSource.getRepository(Users).findOne({ where: { name } });
  }
  async createUser(user: Omit<CreateUserDto, 'id'>) {
    return this.dataSource.getRepository(Users).save(user);
  }
  async updateUser(id: string, user: Users) {
    const userToUpdate = await this.dataSource
      .getRepository(Users)
      .findOne({ where: { id } });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    const index = userToUpdate.id;
    return this.dataSource.getRepository(Users).update(index, user);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async findByCredentials(credentials: credentials) {
    console.log(credentials);
    throw new Error('Method not implemented.');
  }
}
