import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@src/auth/dto/create-user.dto';
import { RefreshTokenRepository } from '@src/auth/refresh-token.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async signin(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string; message: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      console.log('User password is undefined');
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      console.log('Password does not match');
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    console.log('Generated Access Token:', accessToken);
    console.log('Generated Refresh Token:', refreshToken);

    return { accessToken, refreshToken, message: 'Login successful' };
  }

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    console.log('Generated Access Token during Signup:', accessToken);
    console.log('Generated Refresh Token during Signup:', refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
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
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }

  async revokeRefreshToken(refreshToken: string) {
    await this.refreshTokenRepository.deleteToken(refreshToken);
  }
}
