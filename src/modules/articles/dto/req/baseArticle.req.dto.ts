import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class BaseArticleReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    description: 'Article title',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Article description',
  })
  @Type(() => String)
  description: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Article body',
  })
  @Type(() => String)
  body: string;

  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItemsArray)
  @Transform(TransformHelper.toLowerCaseArray)
  tags: string[];
}
