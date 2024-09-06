import { PickType } from '@nestjs/swagger';

import { BaseUserAuthResDto } from './baseUserAuth.req.dto';

export class SingInAuthResDto extends PickType(BaseUserAuthResDto, [
  'email',
  'password',
  'deviceId',
]) {}
