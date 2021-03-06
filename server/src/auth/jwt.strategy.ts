import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';

export type JWTPayload = User & {
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        return req.cookies.jwt;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { id, uuid, name, email, pictureUrl } = payload;
    return { id, uuid, name, email, pictureUrl };
  }
}
