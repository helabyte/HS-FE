import { Component, inject, input } from '@angular/core';

import { QuestionAssignmentComponent } from '@hela/survey-ui/components';
import { QuestionDataService } from '@hela/survey-ui/services';
import { QuestionType } from '@hela/survey-ui/types';
import { Router } from '@angular/router';

@Component({
  selector: 'hls-question-assignment-page',
  imports: [QuestionAssignmentComponent],
  templateUrl: './question-assignment-page.component.html',
  styleUrl: './question-assignment-page.component.scss',
})
export class QuestionAssignmentPageComponent {
  question = input<QuestionType>();

  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  onSubmit(
    value: Partial<{
      surveyAssignment: string;
      topics: string[];
      additionalOptions: string;
    }>
  ) {
    this.questionDataService
      .updateQuestion({ ...this.question(), ...value })
      .subscribe({
        next: ({ question }) => {
          console.log('res', question);
          this.router.navigate(['questions', question.id, 'viewer']);
        },
      });
  }
}
