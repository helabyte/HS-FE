import { SafeAnyType } from './safe-any.type';

type QuestionType = {
  id?: string;
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
};
type QuestionOptionType = {
  inputType: string;
  label: string;
  value?: SafeAnyType;
  votes?: number;
};

export type { QuestionOptionType, QuestionType };
