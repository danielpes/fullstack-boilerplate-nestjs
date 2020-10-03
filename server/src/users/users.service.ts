import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';

export type PublicUserData = User;
export type UserInfo = Omit<User, 'id' | 'uuid'>;
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
    this.users = [];
  }

  async findOneByEmail(email: string): Promise<PublicUserData | undefined> {
    console.log(this.users);
    return this.users.find((user) => user.email === email);
  }

  async createUser(userData: UserInfo): Promise<PublicUserData> {
    const newUser: User = {
      ...userData,
      id: String(this.users.length),
      uuid: uuid.v4()
    };
    this.users.push(newUser);
    return newUser;
  }
}
