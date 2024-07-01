import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async findAll() {
    return this.movieRepository.findAll();
  }

  async findOne(id: number) {
    return this.movieRepository.findOne(id);
  }

  async create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }
}
