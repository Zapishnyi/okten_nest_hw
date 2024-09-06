import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LikeEntity } from '../../../database/entities/like.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class LikeRepository extends Repository<LikeEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(LikeEntity, dataSource.manager);
  }

  async createLike(dto: any) {
    return await this.save(dto);
  }
}
