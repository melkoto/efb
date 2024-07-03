import { Controller, Post } from '@nestjs/common';
import { Roles } from '@src/common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('role')
@Roles(Role.OWNER)
export class RoleController {
  @Post()
  async createAdmin() {
    console.log('I am owner');
  }
}
