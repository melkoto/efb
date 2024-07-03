import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MovieRepository } from './movie.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [MovieService, PrismaService, MovieRepository],
  controllers: [MovieController],
  exports: [MovieService],
  imports: [JwtModule],
})
export class MovieModule {}
