import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetStoredDataFromResponse } from '../auth/decorators/get-stored-data-from-response.decorator';
import { IUserData } from '../auth/interfaces/IUserData';
import { ArticleListQueryDTO } from './dto/req/articleList.query.dto';
import { CreateArticleReqDto } from './dto/req/createArticle.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleListResDto } from './dto/res/articlesList.res.dto';
import { ArticlePresenter } from './services/article-presenter';
import { ArticlesService } from './services/articles.service';

@ApiBearerAuth() /* all endpoints below are require authorization*/
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  public async getList(
    @GetStoredDataFromResponse() userData: IUserData,
    @Query() query: ArticleListQueryDTO,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articlesService.getList(
      userData,
      query,
    );
    return ArticlePresenter.toResponseListDto(entities, total, query);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  public async create(
    @GetStoredDataFromResponse() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    return ArticlePresenter.toResponseDto(
      await this.articlesService.create(userData, dto),
    );
  }

  // @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  // @ApiNotFoundResponse({ description: 'Not found' })
  // @ApiBadRequestResponse({ description: 'Wrong params' })
  // @Patch(':articleId')
  // public async update(
  //   @GetStoredDataFromResponse() userData: IUserData,
  //   @Param('articleId') articleId: string,
  //   @Body() dto: UpdateArticleReqDto,
  // ): Promise<ArticleResDto> {
  //   return await this.articlesService.update(userData, articleId, dto);
  // }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Wrong params' })
  @Get(':articleId')
  public async getById(
    @GetStoredDataFromResponse() userData: IUserData,
    @Param('articleId') articleId: string,
  ): Promise<ArticleResDto> {
    return ArticlePresenter.toResponseDto(
      await this.articlesService.getById(userData, articleId),
    );
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Wrong params' })
  @Delete(':articleId')
  public async remove(@Param('articleId') articleId: string): Promise<void> {
    return await this.articlesService.remove(articleId);
  }
}
