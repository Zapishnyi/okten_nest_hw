import { ApiProperty } from '@nestjs/swagger';

export class PostsListReqDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    default: 1,
  })
  page: number;
  @ApiProperty({
    example: 5,
    description: 'Quantity of elements on page',
    required: false,
    default: 5,
  })
  limit: number;
  @ApiProperty({
    example: 0,
    description: 'Quantity of skipped pages',
    required: false,
    default: 0,
  })
  skip: number;
  @ApiProperty({
    example: 'desc',
    description: 'sorting order',
    required: false,
    default: 'asc',
  })
  sort: string;
  @ApiProperty({
    example: 'id',
    description: 'some text here',
    required: false,
  })
  order: string;
  @ApiProperty({
    example: 'id',
    description: 'some text here',
    required: false,
  })
  orderBy: string;
}
