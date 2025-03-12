import { Document } from 'mongoose';

import { SafeAnyType } from './safe-any.type';

type QuestionType = {
  questionText: string;
  chartType?: string;
  options?: QuestionOptionType[];
  surveyAssignment?: string;
  topics?: string[];
  additionalOptions?: { searchable: boolean; reuse: boolean };
  resultsVisibility?: boolean;
  public?: boolean;
  startDate?: Date | string;
  endDate?: Date | string;
  created: string;
  updated: string;
} & Partial<Document<string>>;
type QuestionOptionType = {
  inputType: string;
  label: string;
  value?: SafeAnyType;
  votes?: number;
} & Partial<Document<string>>;

type QuestionChangeLogType = {
  question: QuestionType;
  currentValue:  Partial<QuestionType>;
  previousValue: Partial<QuestionType>;
  context: string;
  created: string;
} & Partial<Document<string>>;

export type { QuestionChangeLogType,QuestionOptionType, QuestionType };
