import { PickType } from '@nestjs/swagger';

import { UserResponseBaseDto } from './userResponseBase.dto';

export class UserResponsePrivateDto extends PickType(UserResponseBaseDto, [
  '_id',
  'email',
  'name',
  'verified',
  'createdAt',
  'updatedAt',
]) {}
