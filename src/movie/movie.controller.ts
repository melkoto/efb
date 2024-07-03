import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '@src/movie/dto/create-movie.dto';
import { Role } from '@prisma/client';
import { Roles } from '@src/common/decorators/role.decorator';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guards';
import { RolesGuard } from '@src/common/guards/role.guard';

@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }
}
