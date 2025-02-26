import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionAssignmentComponent } from '@hela/survey-ui/ui';
import { QuestionType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-question-assignment-page',
  imports: [QuestionAssignmentComponent],
  templateUrl: './question-assignment-page.component.html',
  styleUrl: './question-assignment-page.component.scss',
})
export class QuestionAssignmentPageComponent {
  id = input<string>();
  question = input<QuestionType>();

  private router = inject(Router);
  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private localize = inject(LocalizeRouterService);
  private location: Location;

  onSubmit(
    value: Partial<{
      surveyAssignment: string;
      topics: string[];
      additionalOptions: string;
    }>
  ) {
    this.realtimeDatabaseService
      .update('questions', this.id(), value)
      .then(() =>
        this.router.navigate([
          this.localize.parser.currentLang,
          'questions',
          this.id(),
          'viewer',
        ])
      );
    // this.questionDataService
    //   .updateQuestion({ ...this.question(), ...value })
    //   .subscribe({
    //     next: ({ question }) => {
    //       console.log('res', question);
    //       this.router.navigate(['questions', question.id, 'viewer']);
    //     },
    //   });
  }
}
