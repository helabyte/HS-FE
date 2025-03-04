import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { Subject, tap } from 'rxjs';

import { QuestionType, SafeAnyType } from '@hela/survey-shared';
import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionTableComponent } from '@hela/survey-ui/ui';
import { QUESTION_DATA_SERVICE_TOKEN } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-questions-page',
  imports: [QuestionTableComponent, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './questions-page.component.html',
  styleUrl: './questions-page.component.scss',
})
export class QuestionsPageComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<void>();

  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private questionDataService = inject(QUESTION_DATA_SERVICE_TOKEN);
  dataSource = signal<QuestionType[]>([]);

  ngOnInit() {
    this.questionDataService
      .getQuestions()
      .subscribe((questions) => this.dataSource.set(questions));
    // this.realtimeDatabaseService
    //   .listen('questions')
    //   .pipe(
    //     tap((value) =>
    //       this.dataSource.set(this.convertToQuestionTypeArray(value))
    //     )
    //   )
    //   .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  convertToQuestionTypeArray(
    data: Record<string, SafeAnyType>
  ): QuestionType[] {
    const result: QuestionType[] = [];

    for (const key in data) {
      if (
        Object.prototype.hasOwnProperty.call(data, key) &&
        key !== 'questionText'
      ) {
        //Crucial check
        const questionData = data[key];

        // Basic structure, handling potential missing properties
        const question = {
          id: key, // Use the key as the ID
          questionText: questionData.questionText || '', // Default to empty string if missing
          chartType: questionData.chartType,
          options: questionData.options,
          surveyAssignment: questionData.surveyAssignment,
          topics: questionData.topics,
          additionalOptions: questionData.additionalOptions,
          resultsVisibility: questionData.resultsVisibility,
          public: questionData.public,
          startDate: questionData.startDate || questionData.startDay, //Handle startDay/startDate
          endDate: questionData.endDate || questionData.endDay, //Handle endDay/endDate
        } as QuestionType;

        Object.keys(question).forEach((key) =>
          (question as SafeAnyType)[key] === undefined
            ? delete (question as SafeAnyType)[key]
            : {}
        );

        result.push(question);
      }
    }
    return result;
  }
}
