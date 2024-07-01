import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @Type(() => Number)
  rating: number;

  @IsInt()
  @Type(() => Number)
  movieId: number;

  @IsInt()
  @Type(() => Number)
  userId: number;
}
