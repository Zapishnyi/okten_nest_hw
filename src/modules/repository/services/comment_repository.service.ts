import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CommentEntity } from '../../../database/entities/comments.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class CommentRepository extends Repository<CommentEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(CommentEntity, dataSource.manager);
  }

  async createComment(dto: any) {
    return await this.save(dto);
  }
}
