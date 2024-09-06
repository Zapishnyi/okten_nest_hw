import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './baseArticle.req.dto';

export class UpdateArticleReqDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'body',
]) {}
