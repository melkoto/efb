import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AddFavoriteDto {
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  movieId: number;
}
