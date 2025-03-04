import { Observable } from 'rxjs';

import { QuestionType } from '@hela/survey-shared';

type QuestionDataServiceType = {
  getQuestion: (id: string) => Observable<QuestionType>;
  getQuestions: () => Observable<QuestionType[]>;
  createQuestion: (question: Pick<QuestionType, 'questionText'| 'options'>) => Observable<QuestionType>;
  updateQuestion: (id:string,question: Partial<QuestionType>) => Observable<QuestionType>;
  deleteQuestion: (id: string) => Observable<QuestionType>;
}

export { QuestionDataServiceType };
