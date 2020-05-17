import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PublicUserData } from 'src/users/users.service';

export type JWTPayload = PublicUserData & {
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        console.log({ cookies: req.cookies });
        return req.cookies.ut;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate(payload: JWTPayload): Promise<PublicUserData> {
    const { id, name, email, pictureUrl } = payload;
    return { id, name, email, pictureUrl };
  }
}
