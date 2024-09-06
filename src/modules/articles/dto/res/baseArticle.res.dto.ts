import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../users/dto/res/user.res.dto';

export class BaseArticleResDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Article ID',
  })
  id: string;

  @ApiProperty({
    example: 'Article title',
    description: 'Article title',
  })
  title: string;

  @ApiProperty({
    example: 'Article description',
    description: 'Article description',
  })
  description: string;

  @ApiProperty({
    example: 'Article body',
    description: 'Article body',
  })
  body: string;

  @ApiProperty({
    example: ['tag1', 'tug2'],
    description: 'Article tags',
  })
  tags: string[];

  @ApiProperty({
    example: '2024-09-02T16:20:30.261Z',
    description: 'Article created time',
  })
  created: Date;

  @ApiProperty({
    example: '2024-09-02T16:20:30.261Z',
    description: 'Article updated time',
  })
  updated: Date;

  user?: UserResDto;
}
