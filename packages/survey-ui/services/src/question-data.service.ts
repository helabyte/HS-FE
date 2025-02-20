import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { QuestionType, SafeAnyType } from '@hela/survey-ui/types';

@Injectable({
  providedIn: 'root',
})
export class QuestionDataService {
  private apiUrl = '/api/questions'; // Consistent with MirageJS route
  private http = inject(HttpClient);

  getQuestions(): Observable<QuestionType[]> {
    return this.http.get<QuestionType[]>(this.apiUrl);
  }

  getQuestion(id: number) {
    return this.http.get<{ question: QuestionType }>(`${this.apiUrl}/${id}`);
  }

  createQuestion(question: QuestionType) {
    const jsonApiData = {
      data: {
        type: 'questions', // Replace with your model's plural name
        attributes: question, // Assuming questionData has properties like text, answer, etc.
      },
    };
    return this.http.post<{ question: QuestionType }>(this.apiUrl, jsonApiData);
  }

  updateQuestion(question: QuestionType) {
    console.log('sssss', question);
    const { id, ...rest } = question;
    const jsonApiData = {
      data: {
        type: 'questions', // Replace with your model's plural name
        attributes: rest, // Assuming questionData has properties like text, answer, etc.
      },
    };
    return this.http.put<{ question: QuestionType }>(
      `${this.apiUrl}/${id}`,
      jsonApiData
    );
  }

  deleteQuestion(id: number): Observable<SafeAnyType> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
