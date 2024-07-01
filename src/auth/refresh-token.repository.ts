import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createToken(token: string, userId: number, expiresAt: Date) {
    return this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });
  }

  async findToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { token },
    });
  }

  async deleteToken(token: string) {
    return this.prisma.refreshToken.delete({
      where: { token },
    });
  }
}
