import { Controller, Get, Req, Res, UseGuards, Redirect } from '@nestjs/common';
import GoogleAuthGuard from './google.guard';
import { JwtAuthGuard } from './jwt.guard';

import { sessionAgeSeconds } from './constants';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private isDevEnv: boolean;

  constructor(configService: ConfigService) {
    this.isDevEnv = configService.get('NODE_ENV') === 'development';
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getAuthenticatedUser(@Req() req) {
    return { user: req.user };
  }

  @Get('logout')
  @Redirect('/login')
  logout(@Req() _req, @Res() res) {
    res.clearCookie('jwt');
    return;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin(): Promise<void> {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect('/home')
  async handleGoogleCallback(@Req() req, @Res() res): Promise<void> {
    res.cookie('jwt', req.user.jwt, {
      httpOnly: true,
      maxAge: 1000 * sessionAgeSeconds,
      secure: !this.isDevEnv
    });
    return;
  }
}
