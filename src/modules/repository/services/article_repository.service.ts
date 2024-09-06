import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListQueryDTO } from '../../articles/dto/req/articleList.query.dto';

@Injectable()
// Important to extend from Repository (typeorm) with mention entity
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    // DataSource: This is a TypeORM class that manages the connection
    // to the database and provides a manager object to interact with the database.
    super(ArticleEntity, dataSource.manager);
  }

  public async getList(
    userId: string,
    query: ArticleListQueryDTO,
  ): Promise<[ArticleEntity[], number]> {
    try {
      // initializes a new query builder for the article entity.
      const queryResult = this.createQueryBuilder('article')
        // performs a SQL LEFT JOIN, which means that it will return all records from the article entity,
        // and for each article, it will include matching records from the related tags entity, if any.
        // 'tag' is the alias for the tags table, which can be used to reference fields of the tags entity
        // elsewhere in the query.
        .leftJoinAndSelect('article.tags', 'tag')
        .leftJoinAndSelect('article.user', 'user')
        // This is equivalent to LIMIT in SQL. It limits the number of articles returned by the query
        // to the value of query.limit.
        .take(query.limit)
        .skip((query.page - 1) * query.limit)
        .orderBy({ 'article.created': 'ASC' });

      if (query.search) {
        // ILIKE operator in SQL is used for case-insensitive!!!! pattern matching,
        // CONCAT(article.description, article.body, article.title) allow  to search in all fields
        queryResult.andWhere(
          'CONCAT(article.description, article.body, article.title) ILIKE :search',
          {
            // % means "any sequence of characters" (including an empty sequence).
            // Placing % on both sides of query.search means the query will match any
            // title that contains the search term anywhere in it.
            search: `%${query.search}%`,
          },
        );
        //   Alternative condition search
        // queryResult
        //   .andWhere(
        //     'CONCAT(article.description, article.body, article.title) ILIKE :search',
        //   )
        //   .setParameter('search', `%${query.search}%`);
      }

      // searching by tag
      if (query.tag) {
        queryResult.andWhere('tag.name = :tag', { tag: query.tag });
        // alternative
        // queryResult.setParameter('tag', query.tag);
      }

      // This method executes the query and returns two pieces of information:
      // An array of results (i.e., the list of articles with their related tags).
      // The total count of records that match the query, including those without tags due to the LEFT JOIN.
      return await queryResult.getManyAndCount();
    } catch (err) {
      throw new Error(err);
    }
  }
}

// Query:

// SELECT "article"."id"          AS "article_id",
//   "article"."created"     AS "article_created",
//   "article"."updated"     AS "article_updated",
//   "article"."title"       AS "article_title",
//   "article"."description" AS "article_description",
//   "article"."body"        AS "article_body",
//   "article"."userId"      AS "article_userId",
//   "tag"."id"              AS "tag_id",
//   "tag"."created"         AS "tag_created",
//   "tag"."updated"         AS "tag_updated",
//   "tag"."name"            AS "tag_name"
// FROM "articles" "article"
// LEFT JOIN "articles_tags_tags" "article_tag" ON "article_tag"."articlesId" = "article"."id"
// LEFT JOIN "tags" "tag" ON "tag"."id" = "article_tag"."tagsId"
// WHERE CONCAT("article"."description", "article"."body", "article"."title") ILIKE :search
// ORDER BY "article"."created" ASC
