import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CreateUpdate } from './models/create_update.model';
import { UserEntity } from './user.entity';

@Entity('follow')
export class FollowEntity extends CreateUpdate {
  @Column('text')
  followerId: string; /*allow to get corresponded userId and join it to UserEntity*/

  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'followerId' })
  userFollower?: UserEntity;

  @Column('text')
  followingId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.following)
  @JoinColumn({ name: 'followingId' })
  userFollowing?: UserEntity;
}
