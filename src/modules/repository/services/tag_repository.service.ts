import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(TagEntity, dataSource.manager);
  }

  public async getPopular(): Promise<TagEntity[]> {
    // Create query to count tags and make a list of 10 most popular
    try {
      return await this.createQueryBuilder('tag')
        .leftJoin('tag.articles', 'article')
        // Performs a left join between the TagEntity (tag) and its associated articles (article).
        .addSelect('COUNT(article.id)', 'tag_articleCount')
        //  This part counts the number of rows (articles) that are joined with each tag.
        // The result of COUNT(article.id) is given the alias articleCount, so it can be referenced later in
        // the query (e.g., for ordering).
        .groupBy('tag.id')
        // Groups the results by the tag.id.
        // This ensures that the COUNT operation is performed for each distinct tag id.
        .orderBy('"tag_articleCount"', 'DESC')
        //  Orders the results by the articleCount in descending order,
        //  so tags with the most associated articles appear first.
        .limit(10)
        // Limits the results to the top 10 tags, based on the number of associated articles.
        .getMany();
      // Executes the query and returns an array of TagEntity objects, each representing a tag.
      // The method getMany() returns all the entities that match the query criteria.}catch(err){}
    } catch (err) {
      throw new Error(err);
    }
  }
}

// QUERY!!!

// SELECT "tag"."id"            AS "tag_id",
//   "tag"."created"       AS "tag_created",
//   "tag"."updated"       AS "tag_updated",
//   "tag"."name"          AS "tag_name",
//   COUNT("article"."id") AS "tag_articleCount"
// FROM "tags" "tag"
// LEFT JOIN "articles_tags_tags" "article_tag" ON "article_tag"."tagsId" = "tag"."id"
// LEFT JOIN "articles" "article" ON "article"."id" = "article_tag"."articlesId"
// GROUP BY "tag"."id"
// ORDER BY "tag_articleCount" DESC
// LIMIT 10
