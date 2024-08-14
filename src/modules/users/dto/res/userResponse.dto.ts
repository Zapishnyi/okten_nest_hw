import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  _id: string;
  @ApiProperty({description:"User Name"})
  name?:string;
  @ApiProperty({description:"Is user emails verified"})
  verified:boolean;
  email?:string;
  password:string;
}
