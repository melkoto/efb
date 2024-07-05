import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.signup(createUserDto);
    res.cookie('jwt', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    return res.status(HttpStatus.CREATED).json({ accessToken, refreshToken });
  }

  @Post('signin')
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  async signin(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, message } =
        await this.authService.signin(loginDto);
      if (accessToken && refreshToken) {
        res.cookie('jwt', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });
        return res
          .status(HttpStatus.OK)
          .json({ message, accessToken, refreshToken });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message });
      }
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: error.message });
    }
  }

  @Post('signout')
  @ApiOperation({ summary: 'Выход пользователя' })
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
  @ApiOperation({ summary: 'Обновление токена' })
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
