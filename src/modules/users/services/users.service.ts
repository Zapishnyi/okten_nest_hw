import { Injectable } from '@nestjs/common';

import { PostsService } from '../../posts/services/posts.service';
import { UserCreateDto } from '../dto/req/userCreate.dto';
import { UserUpdateDto } from '../dto/req/userUpdate.dto';
import { UserResponsePrivateDto } from '../dto/res/userResponsePrivate.dto';

@Injectable()
// @Injectable() you're declaring that this class can be managed by the NestJS IoC
// (Inversion of Control) container. This allows NestJS to handle the lifecycle of
// the class and inject it wherever it's needed.
export class UsersService {
  constructor(
    public readonly PostService: PostsService,
  ) {} /*Integration of methods/services from sabling modules*/

  public async create(
    createUserDto: UserCreateDto,
  ): Promise<UserResponsePrivateDto> {
    this.PostService.create({
      brand: 'bmw',
    }); /*Integration of methods from sabling modules*/

    return {
      _id: '34535435',
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findMe(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async updateMe(
    id: number,
    updateUserDto: UserUpdateDto,
  ): Promise<any> {
    updateUserDto;
    return `This action updates a #${id} user`;
  }

  public async removeMe(id: number): Promise<any> {
    return `This action removes a #${id} user`;
  }

  public async findOne(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }
}
