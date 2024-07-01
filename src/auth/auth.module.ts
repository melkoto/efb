import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UsersModule } from '@src/user/user.module';
import { AuthMiddleware } from '@src/common/middleware/auth.middleware';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [AuthService, RefreshTokenRepository, AuthMiddleware],
  controllers: [AuthController],
})
export class AuthModule {}
