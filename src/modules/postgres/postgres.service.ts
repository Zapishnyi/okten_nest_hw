import * as path from 'node:path';
import * as process from 'node:process';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { EnvConfigType, PostgresConfigType } from '../../configs/envConfigType';

// Alternative way to inject data from ENV to Postgres module from preview (not in use)
@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<EnvConfigType>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      port,
      host,
      password,
      user: username,
      dbName: database,
    } = this.configService.get<PostgresConfigType>('postgres');
    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [
        path.join(process.cwd(), 'dist', 'database', 'entities', '*.entity.tj'),
      ],
      synchronize:
        false /*Must be false to avoid automatic entity's synchronisation with database */,
    };
  }
}
