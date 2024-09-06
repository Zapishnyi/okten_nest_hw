import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserBaseDto } from '../../../users/dto/req/baseUser.req.dto';

export class BaseUserAuthResDto extends PickType(UserBaseDto, [
  'name',
  'email',
  'password',
  'bio',
  'image',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
