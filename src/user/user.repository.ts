import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<Partial<User>> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        login: data.login,
        name: data.name || '',
        surname: data.surname || '',
      },
      select: {
        id: true,
        email: true,
        login: true,
        name: true,
        surname: true,
        createdAt: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        login: true,
        name: true,
        surname: true,
      },
    });
  }

  async findUserById(id: number): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        login: true,
        name: true,
        surname: true,
      },
    });
  }

  async findUserByLogin(login: string): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: { login },
      select: {
        id: true,
        email: true,
        login: true,
        name: true,
        surname: true,
      },
    });
  }

  async updateRole(userId: number, newRole: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: { set: newRole } },
    });
  }
}
