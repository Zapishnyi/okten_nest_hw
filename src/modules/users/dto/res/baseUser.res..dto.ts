import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;
  @ApiProperty({ description: 'User Name', example: 'LazyDude' })
  public readonly name?: string;
  @ApiProperty({ description: 'Is user emails verified' })
  public readonly password?: string;
  public readonly bio?: string;
  public readonly email: string;
  public readonly image: string;
  public readonly created: Date;
  public readonly updated: Date;
}
