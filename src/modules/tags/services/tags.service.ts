import { Injectable } from '@nestjs/common';

import { TagEntity } from '../../../database/entities/tag.entity';
import { ArticleRepository } from '../../repository/services/article_repository.service';
import { TagRepository } from '../../repository/services/tag_repository.service';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  public async getPopular(): Promise<TagEntity[]> {
    return await this.tagRepository.getPopular();
  }
}
