import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserCreateDto } from './dto/req/userCreate.dto';
import { UserUpdateDto } from './dto/req/userUpdate.dto';
import { UserResponsePrivateDto } from './dto/res/userResponsePrivate.dto';
import { UserResponsePublicDto } from './dto/res/userResponsePublic.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @ApiBody({ type: UserCreateDto })
  // @ApiCreatedResponse({ type: UserResponsePrivateDto }) if no swa
  @ApiConflictResponse({ description: 'Access denied' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  public async create(
    @Body() dto: UserCreateDto,
  ): Promise<UserResponsePrivateDto> {
    return await this.usersService.create(dto);
  }

  @Get()
  public async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  // @ApiOkResponse({ type: UserResponsePrivateDto }) removed due swagger plugin for nest
  @Get('me')
  public async findMe(): Promise<UserResponsePrivateDto> {
    return await this.usersService.findMe(1);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  // @ApiBody({ type: UserUpdateDto })
  // @ApiOkResponse({ type: UserResponsePrivateDto })removed due swagger plugin for nest
  @Patch('me')
  public async updateMe(
    @Body() dto: UserUpdateDto,
  ): Promise<UserResponsePrivateDto> {
    return await this.usersService.updateMe(1, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User successfully removed' })
  @Delete('me')
  public async removeMe(): Promise<void> {
    return await this.usersService.removeMe(1);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  // @ApiOkResponse({ type: UserResponsePublicDto }) removed due swagger plugin for nest
  @Get(':userId/')
  public async findOne(
    @Param('userId') userId: string,
  ): Promise<UserResponsePublicDto> {
    return await this.usersService.findOne(+userId);
  }
}
