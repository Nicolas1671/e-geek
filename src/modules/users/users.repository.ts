import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersRepository {
  private users: User[] = [
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
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getUsers() {
    return this.users;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async getUserByName(name: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === name);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async createUser(user: Omit<User, 'id'>) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...user }];
    const newUser = { id, ...user };
    return newUser;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async updateUser(id: string, user: User) {
    const index = this.users.findIndex((u) => u.id === Number(id));
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return this.users[index];
    }
    throw new Error('User not found');
  }
}
