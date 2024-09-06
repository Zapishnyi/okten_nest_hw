import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './baseUser.res..dto';

export class UserResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'email',
  'bio',
  'created',
  'updated',
]) {}
