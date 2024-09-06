import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CreateUpdate } from './models/create_update.model';
import { UserEntity } from './user.entity';

@Entity('likes')
export class LikeEntity extends CreateUpdate {
  @Column('text')
  userId: string; /*allow to get corresponded userId and join it to UserEntity*/
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column('text')
  articleId: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'articleId' })
  article?: ArticleEntity;
}
