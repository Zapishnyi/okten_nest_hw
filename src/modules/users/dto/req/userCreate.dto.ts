import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

class carDto {
  @IsString()
  @Length(2, 20)
  public readonly brand: string;

  @IsString()
  @Length(2, 20)
  public readonly year: number;
}

export class UserCreateDto {
  //Additional description and properties for swagger if needed
  @ApiProperty({ description: 'User Name', required: false })
  // Validation
  @IsNotEmpty()
  @IsString()
  // @MinLength(3)
  @Length(3, 20)
  @IsOptional()
  @Transform(({ /* type,obj,key,value,options */ value }) => value.trim())
  name?: string;

  @ApiProperty({ description: 'Is user emails verified', default: false })
  @IsBoolean()
  verified: boolean;

  @IsString()
  // @IsEmail()
  @Matches(/^\S+@\S+\.\S+$/, {})
  @Transform(({ /* type,obj,key,value,options */ value }) => value.trim())
  // @Matches(/* Regular expression */)
  @ApiProperty({ example: 'cheater@gmail.com' })
  email: string;

  @IsString()
  @Transform(({ /* type,obj,key,value,options */ value }) => value.trim())
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
    context: 'sfsefsfse',
    message:
      'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter,' +
      ' one special character, no space, and it must be 8-16 characters long.',
  })
  @ApiProperty({ example: 'Csfe4354D$' })
  password: string;

  @IsOptional()
  @Transform(({ /* type,obj,key,value,options */ value }) => value.trim())
  birthday: string;

  car: carDto;
}
