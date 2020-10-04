import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as helmet from 'helmet';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DevProxyMiddleware } from './common/middleware/dev-proxy.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), '..', 'client', 'build'),
      exclude: ['/api*', '/auth*']
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.defaults']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          url: config.get('DATABASE_URL'),
          entities: [__dirname + '/**/*.entity.{ts,js}'],
          synchronize: config.get('NODE_ENV') === 'development'
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  private isDevEnv: boolean;
  private globalMiddlewares;

  constructor(configService: ConfigService) {
    this.isDevEnv = configService.get('NODE_ENV') === 'development';
    this.globalMiddlewares = [cookieParser(), csurf({ cookie: true }), helmet()];
  }

  configure(consumer: MiddlewareConsumer) {
    if (this.isDevEnv) {
      consumer.apply(DevProxyMiddleware).exclude('api/(.*)', 'auth/(.*)').forRoutes('*');
    }
    consumer.apply(...this.globalMiddlewares).forRoutes('*');
  }
}
