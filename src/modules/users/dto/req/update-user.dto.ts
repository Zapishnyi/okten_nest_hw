import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './userCreate.dto';

export class UpdateUserDto extends PartialType(UserCreateDto) {}
