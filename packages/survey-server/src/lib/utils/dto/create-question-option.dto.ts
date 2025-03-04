import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { SafeAnyType } from '@hela/survey-shared';

export class CreateQuestionOptionDto {
  @IsOptional()
  @IsString() // Use string for MongoDB ObjectIDs
  id?: string;

  @IsNotEmpty()
  @IsString()
  inputType: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  value?: SafeAnyType;
}
