import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { PollSettingsComponent } from '@hela/survey-ui/ui';
import { QuestionType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-poll-settings-page',
  imports: [PollSettingsComponent],
  templateUrl: './poll-settings-page.component.html',
  styleUrl: './poll-settings-page.component.scss',
})
export class PollSettingsPageComponent {
  id = input<string>();
  question = input<QuestionType>();

  private router = inject(Router);
  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private localize = inject(LocalizeRouterService);

  onSubmit(
    value: Partial<{
      resultsVisibility: boolean;
      public: boolean;
      startDay: Date;
      endDay: Date;
    }>
  ) {
    this.realtimeDatabaseService
      .update('questions', this.id(), value)
      .then(() =>
        this.router.navigate([
          this.localize.parser.currentLang,
          'questions',
          this.id(),
          'question-assignment',
        ])
      );
    // this.questionDataService
    //   .updateQuestion({ ...this.question(), ...value })
    //   .subscribe({
    //     next: ({ question }) => {
    //       console.log('res', question);
    //       this.router.navigate([
    //         'questions',
    //         question.id,
    //         'question-assignment',
    //       ]);
    //     },
    //   });
  }
}
