import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CreateUserDto } from '@src/auth/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.signup(createUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Post('signin')
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const user = await this.authService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!user) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });
      }
      const { accessToken, refreshToken } = await this.authService.login(user);
      res.cookie('jwt', accessToken, { httpOnly: true });
      res.cookie('refreshToken', refreshToken, { httpOnly: true });
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: error.message });
    }
  }

  @Post('signout')
  async signout(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    await this.authService.revokeRefreshToken(refreshToken);
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }

  @Post('refresh')
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    try {
      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      res.cookie('jwt', newAccessToken.accessToken, { httpOnly: true });
      return res.status(HttpStatus.OK).json(newAccessToken);
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid refresh token' });
    }
  }
}
