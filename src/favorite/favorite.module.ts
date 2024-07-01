import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { PrismaService } from '../prisma/prisma.service';
import { FavoriteRepository } from './favorite.repository';

@Module({
  providers: [FavoriteService, PrismaService, FavoriteRepository],
  controllers: [FavoriteController],
  exports: [FavoriteService],
})
export class FavoriteModule {}
