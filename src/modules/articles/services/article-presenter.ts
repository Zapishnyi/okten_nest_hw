import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { UserPresenter } from '../../users/presenter/user-presenter';
import { ArticleListQueryDTO } from '../dto/req/articleList.query.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleListItemResDto } from '../dto/res/articleListItem.res.dto';
import { ArticleListResDto } from '../dto/res/articlesList.res.dto';

export class ArticlePresenter {
  public static toResponseDto([article, user]): ArticleResDto {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      body: article.body,
      tags: article.tags.map((tag) => tag.name),
      created: article.created,
      updated: article.updated,
      user: UserPresenter.toResponseDto(user),
    };
  }

  public static toResponseListItemDto(
    article: ArticleEntity,
  ): ArticleListItemResDto {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      tags: article.tags.map((tag) => tag.name),
      created: article.created,
      user: UserPresenter.toResponseDto(article.user),
    };
  }

  public static toResponseListDto(
    entities: ArticleEntity[],
    total: number,
    query: ArticleListQueryDTO,
  ): ArticleListResDto {
    return {
      data: entities.map((entity) => this.toResponseListItemDto(entity)),
      total,
      ...query,
    };
  }

  public static toIUserData({ userId, deviceId, email }: IUserData): IUserData {
    return {
      userId,
      deviceId,
      email,
    };
  }
}
