import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from '@src/movie/dto/create-movie.dto';
import { Role } from '@prisma/client';
import { Roles } from '@src/common/decorators/role.decorator';
import { JwtAuthGuard } from '@src/common/guards/jwt-auth.guards';
import { RolesGuard } from '@src/common/guards/role.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все фильмы' })
  @Roles(Role.ADMIN)
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить фильм по id' })
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать фильм' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }
}
