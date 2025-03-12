import { PartialType } from '@nestjs/mapped-types';

import { IsOptional, IsString } from 'class-validator';

import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @IsOptional()
  @IsString()
  context: string;
}
