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
  startDay?: Date | string;
  endDay?: Date | string;
};
type QuestionOptionType = {
  inputType: string;
  label: string;
  value?: SafeAnyType;
  votes?: number
};

export type { QuestionOptionType, QuestionType };
