import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(UserEntity, dataSource.manager);
  }
}
