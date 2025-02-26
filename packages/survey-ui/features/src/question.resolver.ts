import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionType } from '@hela/survey-ui/utils';

export const questionResolver: ResolveFn<QuestionType> = (route) => {
  const realtimeDatabaseService = inject(RealtimeDatabaseService);
  return realtimeDatabaseService.readById('questions', route.params['id']);
};
