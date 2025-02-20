import { SafeAnyType } from './safe-any.type';

type QuestionType = {
  id?: string;
  questionText: string;
  chartType?: string;
  options?: QuestionOptionType[];
  surveyAssignment?: string;
  topics?: string[];
  additionalOptions?: string;
  resultsVisibility?: boolean;
  public?: boolean;
  startDay?: Date;
  endDay?: Date;
};
type QuestionOptionType = {
  inputType: string;
  label: string;
  value: SafeAnyType;
};

export type { QuestionOptionType, QuestionType };
