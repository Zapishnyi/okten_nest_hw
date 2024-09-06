import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResDto } from './dto/res/Tag.res.dto';
import { TagPresenter } from './services/tag-presenter';
import { TagsService } from './services/tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagResDto[]> {
    return TagPresenter.toResponseListDto(await this.tagService.getPopular());
  }
}
