import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService, User } from '../users/users.service';
import { JWTPayload } from './jwt.strategy';

export type PassportUserData = Omit<User, 'id' | 'uuid'>;
export interface AuthResult {
  jwt: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async handlePassportAuth(userInfo: PassportUserData): Promise<AuthResult | null> {
    try {
      const user =
        (await this.usersService.findOneByEmail(userInfo.email)) ||
        (await this.usersService.createUser(userInfo));

      const jwtPayload: JWTPayload = { sub: user.id, ...user };
      const jwt = this.jwtService.sign(jwtPayload);
      return { jwt };
    } catch (error) {
      return null;
    }
  }
}
