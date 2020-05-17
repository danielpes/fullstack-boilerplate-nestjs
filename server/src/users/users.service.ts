import { Injectable } from '@nestjs/common';

export type PublicUserData = Omit<User, 'token'>;
export type NewUserData = Omit<User, 'id'>;
export interface User {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
  token: string;
}

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [
      {
        id: '0',
        name: 'John Doe',
        token: 'secret0',
        email: 'John@example.com',
        pictureUrl: 'https://example.com'
      },
      {
        id: '1',
        name: 'Jane Doe',
        token: 'secret1',
        email: 'Jane@example.com',
        pictureUrl: 'https://example.com'
      }
    ];
  }

  async findOneByToken(token: string): Promise<PublicUserData | undefined> {
    return this.users.find((user) => user.token === token);
  }

  async createUser(userData: NewUserData): Promise<PublicUserData> {
    const newUser: User = {
      ...userData,
      id: String(this.users.length)
    };
    this.users.push(newUser);
    return newUser;
  }
}
