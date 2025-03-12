import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { QuestionChangeLogType } from '@hela/survey-shared';
import { QuestionChangeLogDataService } from '@hela/survey-ui/data-access';

export const changelogResolver: ResolveFn<QuestionChangeLogType> = (
  route,
  state
) => {
  const questionChangeLogDataService = inject(QuestionChangeLogDataService);
  return questionChangeLogDataService.findOne(route.params['changelogId']);
};
