import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionTableComponent } from '@hela/survey-ui/ui';
import { QuestionType, SafeAnyType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-questions-page',
  imports: [QuestionTableComponent, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './questions-page.component.html',
  styleUrl: './questions-page.component.scss',
})
export class QuestionsPageComponent implements OnInit {
  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  dataSource = signal<QuestionType[]>([]);
  dataSourceEff = effect(() => {
    console.log('ds', this.dataSource());
  });

  ngOnInit() {
    this.realtimeDatabaseService.listen('questions').subscribe({
      next: (value) => {
        console.log('value', value);
        // console.log('value',Object.values(value) as QuestionType[]);
        this.dataSource.set(this.convertToQuestionTypeArray(value));
      },
    });
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
        const question: QuestionType = {
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
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        Object.keys(question).forEach((key) =>
          question[key] === undefined ? delete question[key] : {}
        );

        result.push(question);
      }
    }
    return result;
  }
}
