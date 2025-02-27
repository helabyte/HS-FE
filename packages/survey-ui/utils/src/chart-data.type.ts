import { QuestionType } from './question.type';

type ChartDataType = Pick<QuestionType, 'options' | 'chartType'>;

export type { ChartDataType };
