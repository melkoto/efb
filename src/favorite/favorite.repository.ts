import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class FavoriteRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.favorite.findMany();
  }

  async add(data: AddFavoriteDto) {
    return this.prisma.favorite.create({ data });
  }

  async remove(id: number) {
    return this.prisma.favorite.delete({ where: { id } });
  }
}
