import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const provider = context.switchToHttp().getRequest()?.params?.provider;
    if (provider) {
      class OAuthGuard extends AuthGuard(provider) {}
      return new OAuthGuard().canActivate(context);
    }
    return false;
  }
}
