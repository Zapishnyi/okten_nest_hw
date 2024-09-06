import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class UserBaseDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'User Name',
    example: 'John Doe',
  })
  public readonly name: string;

  @IsString()
  @Matches(/^\S+@\S+\.\S+$/, { message: 'Must be a valid e-mail address' })
  @Transform(TransformHelper.trim)
  @ApiProperty({ example: 'cheater@gmail.com' })
  public readonly email: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
    context: 'sfsefsfse',
    message:
      'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,' +
      ' one special character, no space, and it must be 8-16 characters long.',
  })
  @ApiProperty({ example: 'Csfe4354D$' })
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Details about a person',
    required: false,
    example: '45 years old, male',
  })
  public readonly bio?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Some beautiful image',
    required: false,
    example: 'path to image ;)',
  })
  public readonly image?: string;
}
