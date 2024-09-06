import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from '../common/filters/global-exemption.filter';
import environmentConfiguration from '../configs/envConfiguration';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    RedisModule,
    // Module provide end-point to ping application and check is it working
    HealthModule,
    // Environment configuration module
    ConfigModule.forRoot({
      load: [
        environmentConfiguration,
      ] /* add configuration to app Module import*/,
      isGlobal:
        true /* flag to have access to variables globally: will be visible in all modules of app*/,
    }),
    // import of Postgres ORM
    PostgresModule,
    RepositoryModule,
    TagsModule,
  ],
  controllers: [],
  providers: [
    // connection of HttpExceptionFilter (errors handler)
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
