import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      name: 'Nicolas',
      email: 'Nicolas@mail.com',
      state: 'available',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getUsers() {
    return this.users;
  }
}
