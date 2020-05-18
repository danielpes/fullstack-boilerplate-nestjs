import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './oauth.google.strategy';
import { GithubStrategy } from './oauth.github.strategy';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';

import { sessionAgeSeconds } from './constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: sessionAgeSeconds }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, GoogleStrategy, GithubStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
