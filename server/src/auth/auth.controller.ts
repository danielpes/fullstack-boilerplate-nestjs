import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import { OAuthGuard } from './oauth.guard';
import { JwtAuthGuard } from './jwt.guard';

import { sessionAgeSeconds } from './constants';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/users.service';

@Controller('auth')
export class AuthController {
  private isDevEnv: boolean;

  constructor(configService: ConfigService) {
    this.isDevEnv = configService.get('NODE_ENV') === 'development';
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getAuthenticatedUser(@Req() req): { user: User } {
    return { user: req.user };
  }

  @Get('logout')
  @Redirect('/login')
  logout(@Req() _req, @Res() res): void {
    res.clearCookie('jwt');
    return;
  }

  @Get(':provider(google|github)/login')
  @UseGuards(OAuthGuard)
  handleOAuthLogin(): void {
    return;
  }

  @Get(':provider(google|github)/callback')
  @UseGuards(OAuthGuard)
  @Redirect('/home')
  handleOAuthCallback(@Req() req, @Res() res): void {
    res.cookie('jwt', req.user.jwt, {
      httpOnly: true,
      maxAge: 1000 * sessionAgeSeconds,
      secure: !this.isDevEnv
    });
  }
}
