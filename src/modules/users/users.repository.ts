import { Injectable } from '@nestjs/common';
//import { User } from './user.interface';
import { credentials } from '../auth/auth.interface';
import { DataSource } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Credentials } from 'src/entities/credentials.entity';
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
    const { password, ...userData } = user;
    return await this.dataSource.transaction(async (manager) => {
      const newCredential = await manager.getRepository(Credentials).save({
        password,
      });
      const newUser = await manager.getRepository(Users).save({
        ...userData,
        credential: newCredential,
      });
      return newUser;
    });
  }
  deleteUser(id: number) {
    return id;
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
  async findByCredentials(credentials: credentials) {
    return this.dataSource.getRepository(Credentials).findOne({
      where: { users: { email: credentials.email } },
      relations: { users: true },
    });
  }
  async findByEmail(email: string) {
    return this.dataSource.getRepository(Users).findOne({
      where: { email },
      relations: { credential: true },
    });
  }
}
