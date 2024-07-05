import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@ApiTags('Лайки')
@Controller('likes')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('movie/:movieId/like')
  @ApiOperation({ summary: 'Добавить лайк фильму' })
  @ApiParam({ name: 'movieId', description: 'ID фильма' })
  async likeMovie(
    @Param('movieId') movieId: number,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.likeMovie(createLikeDto.userId, movieId);
  }

  @Post('movie/:movieId/dislike')
  @ApiOperation({ summary: 'Добавить дизлайк фильму' })
  @ApiParam({ name: 'movieId', description: 'ID фильма' })
  async dislikeMovie(
    @Param('movieId') movieId: number,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.dislikeMovie(createLikeDto.userId, movieId);
  }

  @Post('review/:reviewId/like')
  @ApiOperation({ summary: 'Добавить лайк отзыву' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  async likeReview(
    @Param('reviewId') reviewId: number,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.likeReview(createLikeDto.userId, reviewId);
  }

  @Post('review/:reviewId/dislike')
  @ApiOperation({ summary: 'Добавить дизлайк отзыву' })
  @ApiParam({ name: 'reviewId', description: 'ID отзыва' })
  async dislikeReview(
    @Param('reviewId') reviewId: number,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likeService.dislikeReview(createLikeDto.userId, reviewId);
  }
}
