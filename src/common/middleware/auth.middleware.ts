import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(`AuthMiddleware: ${req.path}`);

    const token = req.cookies['jwt'];
    if (!token) {
      console.log(`AuthMiddleware: Token not found for ${req.path}`);
      throw new UnauthorizedException('Token not found');
    }

    try {
      req.user = this.jwtService.verify(token);
    } catch (err) {
      console.log(`AuthMiddleware: Invalid token for ${req.path}`);
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
