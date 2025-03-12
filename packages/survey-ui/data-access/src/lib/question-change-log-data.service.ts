import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { QuestionChangeLogType } from '@hela/survey-shared';

@Injectable({
  providedIn: 'root',
})
export class QuestionChangeLogDataService {
  private http = inject(HttpClient);

  findOne(id: string){
    return this.http.get<QuestionChangeLogType>(`/api/question-change-logs/${id}`);
  }
}
