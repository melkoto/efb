import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/auth/dto/create-user.dto';
import { UsersService } from '@src/user/user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
