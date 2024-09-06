import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class ArticleListQueryDTO {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number = 10; /*default value*/

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1; /*default value*/

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  tag?: string;

  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  search?: string;
}
