import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { catchError, map } from 'rxjs';
import { EMPTY } from 'rxjs';

import { QuestionDataService } from '@hela/survey-ui/services';
import { QuestionType } from '@hela/survey-ui/types';

export const questionResolver: ResolveFn<QuestionType> = (route) => {
  const router = inject(Router);
  const questionService = inject(QuestionDataService);
  return questionService.getQuestion(route.params['id']).pipe(
    map((value) => value.question),
    catchError((err) => {
      void router.navigate(['/'], { queryParams: { error: err.message } });
      return EMPTY;
    })
  );
};
