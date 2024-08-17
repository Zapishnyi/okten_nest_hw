import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PostsModule, HealthModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
