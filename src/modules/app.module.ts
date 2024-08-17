import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import environmentConfiguration from '../configs/environmentConfiguration';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    HealthModule,
    AuthModule,
    // Environment configuration module
    ConfigModule.forRoot({
      load: [
        environmentConfiguration,
      ] /* add configuration to app Module import*/,
      isGlobal:
        true /* flag to have access to variables globally: will be visible in all modules of app*/,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
