import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { PollSettingsComponent } from '@hela/survey-ui/components';
import { QuestionDataService } from '@hela/survey-ui/services';
import { QuestionType } from '@hela/survey-ui/types';

@Component({
  selector: 'hls-poll-settings-page',
  imports: [PollSettingsComponent],
  templateUrl: './poll-settings-page.component.html',
  styleUrl: './poll-settings-page.component.scss',
})
export class PollSettingsPageComponent {
  question = input<QuestionType>();

  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  onSubmit(
    value: Partial<{
      resultsVisibility: boolean;
      public: boolean;
      startDay: Date;
      endDay: Date;
    }>
  ) {
    this.questionDataService
      .updateQuestion({ ...this.question(), ...value })
      .subscribe({
        next: ({ question }) => {
          console.log('res', question);
          this.router.navigate([
            'questions',
            question.id,
            'question-assignment',
          ]);
        },
      });
  }
}
