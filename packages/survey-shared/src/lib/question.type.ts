import { Document } from "mongoose";

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
} & Partial<Document<string>>;
type QuestionOptionType = {
  inputType: string;
  label: string;
  value?: SafeAnyType;
  votes?: number;
} & Partial<Document<string>>;

export type { QuestionOptionType, QuestionType };
