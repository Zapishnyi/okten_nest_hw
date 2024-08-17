import { ApiProperty } from '@nestjs/swagger';

export class UserResponseBaseDto {
  @ApiProperty({ format: 'uuid' })
  public readonly _id: string;
  @ApiProperty({ description: 'User Name', example: 'LazyDude' })
  public readonly name?: string;
  public readonly age: number;
  @ApiProperty({ description: 'Is user emails verified' })
  public readonly verified: boolean;
  public readonly email: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
