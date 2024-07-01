import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }
}
