import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
