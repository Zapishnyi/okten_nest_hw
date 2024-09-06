import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/IUserData';
import { ArticleRepository } from '../../repository/services/article_repository.service';
import { TagRepository } from '../../repository/services/tag_repository.service';
import { UserRepository } from '../../repository/services/user_repository.service';
import { ArticleListQueryDTO } from '../dto/req/articleList.query.dto';
import { CreateArticleReqDto } from '../dto/req/createArticle.req.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private async createTags(articleTags: string[]): Promise<TagEntity[]> {
    if (!articleTags.length) return [];

    // In(tags): In() is a special operator (a TypeORM function) that checks if a field's value is
    // within a list of specified values.
    const existingTagEntitiesArray = await this.tagRepository.findBy({
      name: In(articleTags),
    });
    const existingTagsArray = existingTagEntitiesArray.map(
      (entity) => entity.name,
    );

    // find new tags
    const newTagsArray = articleTags.filter(
      (articleTag) => !existingTagsArray.includes(articleTag),
    );
    // create entities array from new tags array

    // save new tags in database
    const newTagEntitiesArray = await this.tagRepository.save(
      newTagsArray.map((newTag) => this.tagRepository.create({ name: newTag })),
    );
    // return tags in entity form array
    return [...newTagEntitiesArray, ...existingTagEntitiesArray];
  }

  public async getList(
    { userId }: IUserData,
    query: ArticleListQueryDTO,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.getList(userId, query);
  }

  public async create(
    { userId }: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<[ArticleEntity, UserEntity]> {
    const tags = await this.createTags(dto.tags);
    return await Promise.all([
      this.articleRepository.save(
        this.articleRepository.create({ ...dto, userId, tags }),
      ),
      this.userRepository.findOneBy({ id: userId }),
    ]);
  }

  public async getById(
    { userId }: IUserData,
    articleId: string,
  ): Promise<[ArticleEntity, UserEntity]> {
    return await Promise.all([
      this.articleRepository.findOneBy({ id: articleId }),
      this.userRepository.findOneBy({ id: userId }),
    ]);
  }

  // public async update(
  //   userData: IUserData,
  //   articleId: string,
  //   dto: UpdateArticleReqDto,
  // ): Promise<ArticleResDto> {
  //   return;
  // }

  public async remove(articleId: string): Promise<void> {
    `This action removes a #${articleId} article`;
  }
}
