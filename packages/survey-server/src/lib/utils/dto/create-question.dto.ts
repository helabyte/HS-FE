import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty, IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

import { CreateQuestionOptionDto } from './create-question-option.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsOptional()
  @IsString()
  chartType?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options?: CreateQuestionOptionDto[];

  @IsOptional()
  @IsString()
  surveyAssignment?: string;

  @IsOptional()
  @IsString({ each: true })
  topics?: string[];

  @IsOptional()
  @IsObject()
  additionalOptions?: { searchable: boolean; reuse: boolean };

  @IsOptional()
  @IsBoolean()
  resultsVisibility?: boolean;

  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}

