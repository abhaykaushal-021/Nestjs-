import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../auth/user.schema';
import { AuthUser } from '../../auth/jwt.strategy';

interface RequestWithUser {
  user: AuthUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { user } = request;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission');
    }
    return true;
  }
}
