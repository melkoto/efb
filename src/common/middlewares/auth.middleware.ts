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

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log(
        `AuthMiddleware: Authorization header not found for ${req.path}`,
      );
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      console.log(`AuthMiddleware: Token not found for ${req.path}`);
      throw new UnauthorizedException('Token not found');
    }

    try {
      req.user = this.jwtService.verify(token);
      console.log(`AuthMiddleware: User decoded: ${JSON.stringify(req.user)}`);
    } catch (err) {
      console.log(`AuthMiddleware: Invalid token for ${req.path}`);
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
