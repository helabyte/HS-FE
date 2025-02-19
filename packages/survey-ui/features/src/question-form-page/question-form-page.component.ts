import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionFormComponent } from '@hela/survey-ui/components';
import { QuestionDataService } from '@hela/survey-ui/services';
import { QuestionType, SafeAnyType } from '@hela/survey-ui/types';

@Component({
  selector: 'hls-question-form-page',
  imports: [QuestionFormComponent],
  templateUrl: './question-form-page.component.html',
  styleUrl: './question-form-page.component.scss',
})
export class QuestionFormPageComponent {
  question = input<QuestionType>();

  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  onSubmit(
    value: Partial<{
      questionText: string;
      options: { label: string; value: SafeAnyType }[];
    }>
  ) {
    if (!this.question()) {
      this.questionDataService.createQuestion(value as QuestionType).subscribe({
        next: ({ question }) => {
          this.router.navigate([
            'questions',
            question.id,
            'visualization-type',
          ]);
        },
      });
    } else {
      this.questionDataService
        .updateQuestion({ ...this.question(), ...value } as QuestionType)
        .subscribe({
          next: ({ question }) => {
            console.log('question', question);
            this.router.navigate([
              'questions',
              question.id,
              'visualization-type',
            ]);
          },
        });
    }
  }
}
