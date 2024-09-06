import { PickType } from '@nestjs/swagger';

import { UserBaseDto } from './baseUser.req.dto';

export class UserUpdateDto extends PickType(UserBaseDto, [
  'name',
  'image',
  'bio',
]) {}
