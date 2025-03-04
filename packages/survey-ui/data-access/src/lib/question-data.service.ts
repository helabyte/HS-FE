import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { QuestionType } from '@hela/survey-shared';
import { QuestionDataServiceType } from '@hela/survey-ui/utils';

@Injectable({
  providedIn: 'root',
})
export class QuestionDataService implements QuestionDataServiceType {
  private http = inject(HttpClient);

  createQuestion(data: Partial<QuestionType>): Observable<QuestionType> {
    return this.http.post<QuestionType>('/api/questions', data);
  }

  deleteQuestion(id: string): Observable<QuestionType> {
    return this.http.delete<QuestionType>(`/api/questions/${id}`);
  }

  getQuestion(id: string): Observable<QuestionType> {
    return this.http.get<QuestionType>(`/api/questions/${id}`);
  }

  getQuestions(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>('/api/questions');
  }

  updateQuestion(id: string,question: Partial<QuestionType>): Observable<QuestionType> {
    return this.http.patch<QuestionType>(`/api/questions/${id}`, question);
  }
}
