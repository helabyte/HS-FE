import { InjectionToken } from '@angular/core';

import { QuestionDataServiceType } from './question-data-service.type';

export const QUESTION_DATA_SERVICE_TOKEN =
  new InjectionToken<QuestionDataServiceType>('QuestionDataService');
