import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  @MaxDate(new Date())
  releaseDate: Date;

  @IsNumber()
  rating: number;
}
