import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../dto/res/Tag.res.dto';

export class TagPresenter {
  public static toResponseListDto(tags: TagEntity[]): TagResDto[] {
    return tags.map((tag) => this.toResponseDto(tag));
  }

  public static toResponseDto(tag: TagEntity): TagResDto {
    return {
      name: tag.name,
      articlesCount: tag.articleCount,
    };
  }
}
