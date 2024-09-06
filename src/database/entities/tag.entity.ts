import { Column, Entity, ManyToMany, VirtualColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CreateUpdate } from './models/create_update.model';

@Entity('tags')
export class TagEntity extends CreateUpdate {
  @Column('text', { unique: true })
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];

  //@VirtualColumn decorator in TypeORM is used to define a property in an entity that is
  // not stored in the database but can
  // be computed or derived dynamically when the entity is loaded.
  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;
}
