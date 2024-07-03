import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { RefreshTokenRepository } from './refresh-token.repository';
import { UsersService } from '@src/user/user.service';
import { LoginDto } from '@src/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    if (!email || !password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.usersService.findByEmail(email);

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signin(
    loginDto: LoginDto,
  ): Promise<{ accessToken?: string; refreshToken?: string; message: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.refreshTokenRepository.createToken(
      refreshToken,
      user.id,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { accessToken, refreshToken, message: 'Login successful' };
  }

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const storedToken =
      await this.refreshTokenRepository.findToken(refreshToken);

    if (!storedToken || new Date() > storedToken.expiresAt) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(storedToken.userId);
    const payload = { email: user?.email, sub: user?.id, role: user?.role };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    return { accessToken: newAccessToken };
  }

  async revokeRefreshToken(refreshToken: string) {
    await this.refreshTokenRepository.deleteToken(refreshToken);
  }
}
