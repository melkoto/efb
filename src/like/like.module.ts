import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from '@src/like/like.repository';
import { PrismaService } from '@src/prisma/prisma.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, PrismaService],
})
export class LikeModule {}
