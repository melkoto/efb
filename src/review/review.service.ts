import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  async findAll(movieId: number) {
    return this.reviewRepository.findAll(movieId);
  }

  async create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.create(createReviewDto);
  }
}
