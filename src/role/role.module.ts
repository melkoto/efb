import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UsersModule } from '@src/user/user.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [UsersModule],
})
export class RoleModule {}
