import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('RolesGuard: No roles required for this route');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      console.log('RolesGuard: User not found in request');
      throw new ForbiddenException('User not found in request');
    }

    console.log(
      `RolesGuard: User role: ${user.role}, Required roles: ${requiredRoles}`,
    );
    const hasRole = requiredRoles.some((role) => this.hasRole(user.role, role));

    if (!hasRole) {
      console.log(
        `RolesGuard: User with role ${user.role} does not have required roles: ${requiredRoles}`,
      );
      throw new ForbiddenException('Forbidden resource');
    }

    return true;
  }

  hasRole(userRole: Role, requiredRole: Role): boolean {
    const roleHierarchy: Record<Role, Role[]> = {
      [Role.OWNER]: [Role.OWNER, Role.ADMIN, Role.MODERATOR, Role.USER],
      [Role.ADMIN]: [Role.ADMIN, Role.MODERATOR, Role.USER],
      [Role.MODERATOR]: [Role.MODERATOR, Role.USER],
      [Role.USER]: [Role.USER],
    };
    return roleHierarchy[userRole]?.includes(requiredRole);
  }
}
