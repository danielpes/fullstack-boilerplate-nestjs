import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-github';

import { OAuthBaseStrategy } from './oauth.base.strategy';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends OAuthBaseStrategy(Strategy) {
  constructor(authService: AuthService, configService: ConfigService) {
    const callbackDomain = configService.get('OAUTH_CALLBACK_DOMAIN');
    super(authService, {
      clientID: configService.get('OAUTH_GITHUB_CLIENT_ID'),
      clientSecret: configService.get('OAUTH_GITHUB_CLIENT_SECRET'),
      callbackURL: `${callbackDomain}/auth/github/callback`,
      passReqToCallback: true,
      scope: ['user']
    });
  }
}
