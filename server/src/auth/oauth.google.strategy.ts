import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';

import { OAuthBaseStrategy } from './oauth.base.strategy';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends OAuthBaseStrategy(Strategy) {
  constructor(authService: AuthService, configService: ConfigService) {
    const callbackDomain = configService.get('OAUTH_CALLBACK_DOMAIN');
    super(authService, {
      clientID: configService.get('OAUTH_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('OAUTH_GOOGLE_CLIENT_SECRET'),
      callbackURL: `${callbackDomain}/auth/google/callback`,
      passReqToCallback: true,
      scope: ['profile', 'email']
    });
  }
}
