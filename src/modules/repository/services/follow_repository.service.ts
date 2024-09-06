import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FollowEntity } from '../../../database/entities/follow.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class FollowRepository extends Repository<FollowEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(FollowEntity, dataSource.manager);
  }

  async createFollow(dto: any) {
    return await this.save(dto);
  }
}
