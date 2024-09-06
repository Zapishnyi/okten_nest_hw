import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CreateUpdate } from './models/create_update.model';
import { UserEntity } from './user.entity';

@Entity('comments')
export class CommentEntity extends CreateUpdate {
  @Column('text')
  body: string;

  @Column('text')
  userId: string; /*allow to get corresponded userId and join it to UserEntity*/
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @Column('text')
  articleId: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'articleId' })
  article?: ArticleEntity;
}
