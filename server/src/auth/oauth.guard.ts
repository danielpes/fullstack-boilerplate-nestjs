import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const provider = context.switchToHttp().getRequest()?.params?.provider;
    if (provider) {
      class ProviderAuthGuard extends AuthGuard(provider) {}
      return new ProviderAuthGuard().canActivate(context);
    }
    return false;
  }
}
