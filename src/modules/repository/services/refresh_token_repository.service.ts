import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../../database/entities/refresh_token.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(RefreshTokenEntity, dataSource.manager);
  }

  public async isRefreshTokenExist(refresh: string): Promise<boolean> {
    return await this.exists({ where: { refresh } });
  }
}
