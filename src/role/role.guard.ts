import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from '@prisma/client'; // Импорт из Prisma клиента

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => this.hasRole(user.role, role));
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
