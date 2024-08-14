import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserResponseDto } from './dto/res/userResponse.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class UsersService {
  constructor(public readonly PostService: PostsService) {}
  create(createUserDto: UserResponseDto): UserResponseDto {
    this.PostService.create({ brand: 'bmw' });
    return {
      _id: '34535435',
      name: 'John Doe',
      verified: false,
      email: 'sfefsef@svse.com',
      password: 'sfefsefsfsef',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
