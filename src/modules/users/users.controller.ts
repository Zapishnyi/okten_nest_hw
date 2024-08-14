import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiTags } from '@nestjs/swagger';

import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserCreateDto } from './dto/req/userCreate.dto';
import { UserResponseDto } from './dto/res/userResponse.dto';
import { UsersService } from './users.service';

@ApiTags('Users')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: UserCreateDto })
  @ApiConflictResponse({ description: 'Access denied' })
  create(@Body() createUserDto: UserResponseDto): UserResponseDto {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
