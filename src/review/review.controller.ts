import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':movieId')
  @ApiOperation({ summary: 'Получить все отзывы по фильму' })
  findAll(@Param('movieId') movieId: string) {
    return this.reviewService.findAll(+movieId);
  }

  @Post()
  @ApiOperation({ summary: 'Создать отзыв на фильм' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }
}
