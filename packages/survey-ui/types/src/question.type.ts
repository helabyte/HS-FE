type QuestionType = {
  id: number;
  text: string;
  type: 'text' | 'radio' | 'checkbox';
  options?: string[];
};

export type { QuestionType };
