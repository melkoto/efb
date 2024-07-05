import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeRepository {
  constructor(private prisma: PrismaService) {}

  async likeMovie(userId: number, movieId: number) {
    return this.prisma.movieLike.create({
      data: {
        userId,
        movieId,
      },
    });
  }

  async dislikeMovie(userId: number, movieId: number) {
    return this.prisma.movieDislike.create({
      data: {
        userId,
        movieId,
      },
    });
  }

  async likeReview(userId: number, reviewId: number) {
    return this.prisma.reviewLike.create({
      data: {
        userId,
        reviewId,
      },
    });
  }

  async dislikeReview(userId: number, reviewId: number) {
    return this.prisma.reviewDislike.create({
      data: {
        userId,
        reviewId,
      },
    });
  }
}
