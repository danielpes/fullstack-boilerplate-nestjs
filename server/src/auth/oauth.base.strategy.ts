import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CreateUserDto } from '../users/create-user.dto';
import { AuthService } from './auth.service';

export function OAuthBaseStrategy(Strategy): { new (...args): InstanceType<any> } {
  class OAuthBaseStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, strategyOptions) {
      super({
        passReqToCallback: true,
        ...strategyOptions
      });
    }

    async validate(_req: Request, accessToken: string, _refreshToken: string, profile, done) {
      if (!profile || !accessToken) {
        return done(new BadRequestException());
      }
      const userInfo: CreateUserDto = {
        name: profile.displayName,
        email: profile.emails[0].value,
        pictureUrl: profile.picture
      };

      try {
        const user = await this.authService.handlePassportAuth(userInfo);
        if (user) {
          return done(null, user);
        } else {
          throw new InternalServerErrorException();
        }
      } catch (error) {
        return done(error);
      }
    }
  }

  return OAuthBaseStrategy;
}
