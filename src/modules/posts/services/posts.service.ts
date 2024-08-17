import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '../dto/req/create-post.dto';
import { PostsListReqDto } from '../dto/req/posts_list.req.dto';
import { UpdatePostDto } from '../dto/req/update-post.dto';

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post' + createPostDto;
  }

  findAll(query: PostsListReqDto) {
    query;
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post ${updatePostDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
