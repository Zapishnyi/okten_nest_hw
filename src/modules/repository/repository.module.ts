import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './services/article_repository.service';
import { CommentRepository } from './services/comment_repository.service';
import { FollowRepository } from './services/follow_repository.service';
import { LikeRepository } from './services/like_repository.service';
import { RefreshTokenRepository } from './services/refresh_token_repository.service';
import { TagRepository } from './services/tag_repository.service';
import { UserRepository } from './services/user_repository.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    UserRepository,
    ArticleRepository,
    CommentRepository,
    FollowRepository,
    LikeRepository,
    RefreshTokenRepository,
    TagRepository,
  ],
  exports: [
    UserRepository,
    ArticleRepository,
    CommentRepository,
    FollowRepository,
    LikeRepository,
    RefreshTokenRepository,
    TagRepository,
  ],
})
export class RepositoryModule {}
