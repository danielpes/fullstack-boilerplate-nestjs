import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

export type PublicUserData = User;
export type NewUserData = Omit<User, 'id' | 'uuid'>;
export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  pictureUrl: string;
}

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: '0',
        uuid: '3bb7b497-84ba-451b-b370-dcbdbafaacf1',
        name: 'John Doe',
        email: 'John@example.com',
        pictureUrl: 'https://example.com'
      },
      {
        id: '1',
        uuid: 'b1b8b840-fd02-4d15-814c-f3814fa4e81a',
        name: 'Jane Doe',
        email: 'Jane@example.com',
        pictureUrl: 'https://example.com'
      }
    ];
  }

  async findOneByEmail(email: string): Promise<PublicUserData | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async createUser(userData: NewUserData): Promise<PublicUserData> {
    const newUser: User = {
      ...userData,
      id: String(this.users.length),
      uuid: uuid.v4()
    };
    this.users.push(newUser);
    return newUser;
  }
}
