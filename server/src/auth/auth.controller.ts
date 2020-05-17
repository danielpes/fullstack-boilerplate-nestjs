import { Controller, Get, Req, UseGuards, Redirect, Res } from '@nestjs/common';
import GoogleAuthGuard from './google.guard';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin(): Promise<void> {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect('/home')
  async handleGoogleCallback(@Req() req, @Res() res): Promise<void> {
    res.cookie('jwt', req.user.jwt, {});
    return;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getAuthenticatedUser(@Req() req) {
    return { user: req.user };
  }
}
