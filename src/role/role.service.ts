import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly userService: UsersService) {}

  async changeUserRole(userId: number, newRole: Role, currentUserRole: Role) {
    if (this.canAssignRole(currentUserRole, newRole)) {
      return this.userService.updateRole(userId, newRole);
    }
    throw new ForbiddenException(
      'You do not have permission to perform this action',
    );
  }

  canAssignRole(currentUserRole: Role, newRole: Role): boolean {
    const roleHierarchy: Record<Role, Role[]> = {
      [Role.OWNER]: [Role.ADMIN, Role.MODERATOR, Role.USER],
      [Role.ADMIN]: [Role.MODERATOR],
      [Role.MODERATOR]: [Role.USER],
      [Role.USER]: [],
    };
    return roleHierarchy[currentUserRole]?.includes(newRole);
  }
}
