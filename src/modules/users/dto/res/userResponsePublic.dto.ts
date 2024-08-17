import { PickType } from '@nestjs/swagger';

import { UserResponseBaseDto } from './userResponseBase.dto';

export class UserResponsePublicDto extends PickType(UserResponseBaseDto, [
  'name',
  '_id',
]) {}
