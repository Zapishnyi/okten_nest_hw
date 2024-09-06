import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CreateUpdate } from './models/create_update.model';
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends CreateUpdate {
  @Column('text')
  refresh: string;

  @Column('text')
  deviceId: string;

  @Column('text')
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens, {
    // When you set onDelete: 'CASCADE' on a foreign key, it means that if a row in the parent table is deleted,
    // all rows in the child table that reference the deleted row will also be automatically deleted.
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;
}
