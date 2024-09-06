import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../common/helpers/Transform.helper';

export const customDecoratorForValidation = applyDecorators(
  IsNotEmpty(),
  IsString(),
  Length(3, 20),
  IsOptional(),
  Transform(TransformHelper.trim),
);

export function customDecoratorForValidationFunction() {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    Length(3, 20),
    IsOptional(),
    Transform(TransformHelper.trim),
  );
}
