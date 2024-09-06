import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CommentEntity } from './comments.entity';
import { LikeEntity } from './like.entity';
import { CreateUpdate } from './models/create_update.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends CreateUpdate {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column('text')
  userId: string; /*allow to get corresponded userId and join it to UserEntity*/
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  @JoinTable({ synchronize: true }) /*intermediate table set (could be named)*/
  tags?: TagEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.article)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.article)
  comments?: CommentEntity[];
}
