import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptionsWithRequest,
  Profile,
  VerifyCallback
} from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  private readonly authService: AuthService;

  constructor(authService: AuthService, configService: ConfigService) {
    const callbackDomain = configService.get('OAUTH_CALLBACK_DOMAIN');
    super({
      clientID: configService.get('OAUTH_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('OAUTH_GOOGLE_CLIENT_SECRET'),
      callbackURL: `${callbackDomain}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email'],
      successRedirect: '/'
    } as StrategyOptionsWithRequest);

    this.authService = authService;
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    if (!profile || !accessToken) {
      return done(new BadRequestException());
    }
    console.log({ profile });
    const userInfo = {
      token: accessToken,
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
