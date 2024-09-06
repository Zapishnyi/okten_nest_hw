import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { ArticleListItemResDto } from './articleListItem.res.dto';

export class ArticleListResDto {
  @ApiProperty({
    example: ArticleListItemResDto,
    description: 'List of articles as per query',
  })
  data: ArticleListItemResDto[];

  @ApiProperty({
    example: '300',
    description: 'Total quantity of articles',
  })
  total: number;

  @ApiProperty({
    example: '5',
    description: 'Quantity of articles on each page',
  })
  limit: number;

  @ApiProperty({
    example: '1',
    description: 'Current page',
  })
  page: number;

  @ApiProperty({
    example: 'Article title',
    description: 'Search by title',
  })
  @IsOptional()
  search?: string;

  @ApiProperty({
    example: 'tag2',
    description: 'Search tag',
  })
  @IsOptional()
  tag?: string;
}
