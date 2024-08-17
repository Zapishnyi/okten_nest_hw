import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PostsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
