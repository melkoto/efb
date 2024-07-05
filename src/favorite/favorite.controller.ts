import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все избранные фильмы' })
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Добавить фильм в избранное' })
  add(@Body() addFavoriteDto: AddFavoriteDto) {
    return this.favoriteService.add(addFavoriteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить фильм из избранного' })
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(+id);
  }
}
