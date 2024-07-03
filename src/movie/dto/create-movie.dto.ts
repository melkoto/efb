import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('.').map(Number);
    return new Date(year, month - 1, day);
  })
  @MaxDate(new Date())
  releaseDate: Date;

  @IsNumber()
  rating: number;
}
