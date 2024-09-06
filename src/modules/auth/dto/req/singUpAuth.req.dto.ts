import { PickType } from '@nestjs/swagger';

import { BaseUserAuthResDto } from './baseUserAuth.req.dto';

export class SingUpAuthReqDto extends PickType(BaseUserAuthResDto, [
  'name',
  'email',
  'password',
  'bio',
  'image',
  'deviceId',
]) {}
