// src/like/like.service.ts

import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async likeMovie(userId: number, movieId: number) {
    return this.likeRepository.likeMovie(userId, movieId);
  }

  async dislikeMovie(userId: number, movieId: number) {
    return this.likeRepository.dislikeMovie(userId, movieId);
  }

  async likeReview(userId: number, reviewId: number) {
    return this.likeRepository.likeReview(userId, reviewId);
  }

  async dislikeReview(userId: number, reviewId: number) {
    return this.likeRepository.dislikeReview(userId, reviewId);
  }
}
