import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({ description: 'ID пользователя' })
  userId: number;
}
