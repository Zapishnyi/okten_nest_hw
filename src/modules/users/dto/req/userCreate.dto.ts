import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ description: 'User Name', required: false })
  name: string;

  @ApiProperty({ description: 'Is user emails verified', default: false })
  verified: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
