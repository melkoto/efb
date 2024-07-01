import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<Partial<User>> {
    const existingUserByEmail = await this.userRepository.findUserByEmail(
      data.email,
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    const existingUserByLogin = await this.userRepository.findUserByLogin(
      data.login,
    );
    if (existingUserByLogin) {
      throw new ConflictException('Login already in use');
    }

    return this.userRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<Partial<User> | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async findById(id: number): Promise<Partial<User> | null> {
    return this.userRepository.findUserById(id);
  }

  async findByLogin(login: string): Promise<Partial<User> | null> {
    return this.userRepository.findUserByLogin(login);
  }
}
