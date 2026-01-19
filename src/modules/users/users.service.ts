import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';
import { credentials } from '../auth/auth.interface';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Users } from 'src/entities/users.entity';
//import { Repository } from 'typeorm';

/* @Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  saveUser(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }
} */

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
  findByCredentials(credentials: credentials) {
    return this.usersRepository.findByCredentials(credentials);
  }
}
