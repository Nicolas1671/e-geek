import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }
  getUserByName(name: string) {
    return this.usersRepository.getUserByName(name);
  }
  getUserById(id: number) {
    return this.usersRepository.getUserById(id);
  }
  deleteUser() {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, user: User) {
    return this.usersRepository.updateUser(id, user);
  }
  createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.createUser(user);
  }
}
