import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { GetStoredDataFromResponse } from '../auth/decorators/get-stored-data-from-response.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/IUserData';
import { UserUpdateDto } from './dto/req/userUpdate.dto';
import { UserResDto } from './dto/res/user.res.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // // @ApiBody({ type: UserCreateDto })
  // // @ApiCreatedResponse({ type: UserResDto }) if no swagger plugin, idetefy request and re
  // @ApiConflictResponse({ description: 'Access denied' })
  // @ApiBadRequestResponse({
  //   description: 'Bad Request',
  //   example: {
  //     statusCod: 400,
  //     messages: ['Bad Request Exception', 'Must be a valid e-mail address'],
  //     timestamp: '2024-08-21T06:07:40.731Z',
  //     path: '/users',
  //   },
  // })
  // public async create(
  //   @Body() dto: UserCreateDto,
  // ): Promise<UserResDto> {
  //   return await this.usersService.create(dto);
  // }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date().toUTCString(),
      path: '/users/me',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @ApiOkResponse({ type: UserResDto }) removed due swagger plugin for nest
  @Get('me')
  public async findMe(
    @GetStoredDataFromResponse() UserData: IUserData,
  ): Promise<UserResDto> {
    return await this.usersService.findMe(UserData);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  // @ApiBody({ type: UserUpdateDto })
  // @ApiOkResponse({ type: UserResDto })removed due swagger plugin for nest
  @Patch('me')
  public async updateMe(
    @GetStoredDataFromResponse() UserData: IUserData,
    @Body() dto: UserUpdateDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateMe(UserData, dto);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Access denied' })
  // @HttpCode(204)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNoContentResponse({ description: 'User successfully removed' })
  @Delete('me')
  public async removeMe(
    @GetStoredDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @SkipAuth()
  // @ApiOkResponse({ type: UserResponsePublicDto }) removed due swagger plugin for nest
  @Get(':userId/')
  public async findOne(
    // ParseUUIDPipe is a class provided by the NestJS framework, primarily used as a validation pipe to ensure
    // that a string input is a valid UUID (Universally Unique Identifier) before it is processed further
    // in a route handler or controller.
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResDto> {
    return await this.usersService.findOne(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Followed link created successfully' })
  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @GetStoredDataFromResponse() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.usersService.follow(userData, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Followed link removed successfully' })
  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unFollow(
    @GetStoredDataFromResponse() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.usersService.unFollow(userData, userId);
  }
}
