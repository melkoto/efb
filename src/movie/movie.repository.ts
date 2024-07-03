import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie, MovieDislike, MovieLike, Prisma } from '@prisma/client';

@Injectable()
export class MovieRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findOne(id: number) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }

  async createMovie(data: Prisma.MovieCreateInput): Promise<Movie> {
    return this.prisma.movie.create({
      data,
    });
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.prisma.movie.findMany();
  }

  async findMovieById(id: number): Promise<Movie | null> {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async updateMovie(id: number, data: Prisma.MovieUpdateInput): Promise<Movie> {
    return this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async deleteMovie(id: number): Promise<Movie> {
    return this.prisma.movie.delete({
      where: { id },
    });
  }

  async likeMovie(movieId: number, userId: number): Promise<MovieLike> {
    return this.prisma.movieLike.create({
      data: {
        movieId,
        userId,
      },
    });
  }

  async dislikeMovie(movieId: number, userId: number): Promise<MovieDislike> {
    return this.prisma.movieDislike.create({
      data: {
        movieId,
        userId,
      },
    });
  }

  async removeLike(movieId: number, userId: number): Promise<MovieLike> {
    return this.prisma.movieLike.delete({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });
  }

  async removeDislike(movieId: number, userId: number): Promise<MovieDislike> {
    return this.prisma.movieDislike.delete({
      where: {
        movieId_userId: {
          movieId,
          userId,
        },
      },
    });
  }

  async countMovieLikes(movieId: number): Promise<number> {
    return this.prisma.movieLike.count({
      where: { movieId },
    });
  }

  async countMovieDislikes(movieId: number): Promise<number> {
    return this.prisma.movieDislike.count({
      where: { movieId },
    });
  }

  async findReviewsForMovie(movieId: number): Promise<any> {
    return this.prisma.review.findMany({
      where: { movieId },
      include: {
        ReviewLike: true,
        ReviewDislike: true,
      },
    });
  }
}
