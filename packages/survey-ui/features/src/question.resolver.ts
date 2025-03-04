import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { QuestionType } from '@hela/survey-shared';
import { QUESTION_DATA_SERVICE_TOKEN } from '@hela/survey-ui/utils';

export const questionResolver: ResolveFn<QuestionType> = (route) => {
  const questionDataService = inject(QUESTION_DATA_SERVICE_TOKEN);
  return questionDataService.getQuestion(route.params['id']);
};
