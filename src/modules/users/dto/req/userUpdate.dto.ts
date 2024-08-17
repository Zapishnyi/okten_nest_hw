import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  verified?: boolean;

  @ApiProperty({ required: false })
  email?: string;
}
