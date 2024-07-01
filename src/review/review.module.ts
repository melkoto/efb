import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewRepository } from './review.repository';

@Module({
  providers: [ReviewService, PrismaService, ReviewRepository],
  controllers: [ReviewController],
  exports: [ReviewService],
})
export class ReviewModule {}
