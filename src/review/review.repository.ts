import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(movieId: number) {
    return this.prisma.review.findMany({ where: { movieId } });
  }

  async create(data: CreateReviewDto) {
    return this.prisma.review.create({ data });
  }
}
