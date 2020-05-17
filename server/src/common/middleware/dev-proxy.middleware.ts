import { NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

export class DevProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
      logLevel: 'silent'
    })(req, res, next);
  }
}
