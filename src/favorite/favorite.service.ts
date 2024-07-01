import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async findAll() {
    return this.favoriteRepository.findAll();
  }

  async add(addFavoriteDto: AddFavoriteDto) {
    return this.favoriteRepository.add(addFavoriteDto);
  }

  async remove(id: number) {
    return this.favoriteRepository.remove(id);
  }
}
