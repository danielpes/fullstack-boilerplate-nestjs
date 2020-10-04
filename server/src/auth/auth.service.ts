import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/create-user.dto';
import { UsersService } from '../users/users.service';
import { JWTPayload } from './jwt.strategy';

export interface AuthResult {
  jwt: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async handlePassportAuth(userInfo: CreateUserDto): Promise<AuthResult | null> {
    const user =
      (await this.usersService.findOneByEmail(userInfo.email)) ||
      (await this.usersService.createUser(userInfo));

    const jwtPayload: JWTPayload = { sub: user.id, ...user };
    const jwt = this.jwtService.sign(jwtPayload);
    return { jwt };
  }
}
