import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionFormComponent } from '@hela/survey-ui/ui';
import { QuestionType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-question-form-page',
  imports: [QuestionFormComponent],
  templateUrl: './question-form-page.component.html',
  styleUrl: './question-form-page.component.scss',
})
export class QuestionFormPageComponent {
  question = input<QuestionType>();

  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private router = inject(Router);
  private localize = inject(LocalizeRouterService);

  onSubmit(value: Pick<QuestionType, 'questionText' | 'options'>) {
    this.realtimeDatabaseService
      .create<Pick<QuestionType, 'questionText' | 'options'>>(
        'questions',
        value
      )
      .then((result) => {
        console.log(result);
        void this.router.navigate([
          this.localize.parser.currentLang,
          'questions',
          result.id,
          'visualization-type',
        ]);
      });
    // if (!this.question()) {
    //   this.questionDataService.createQuestion(value as QuestionType).subscribe({
    //     next: ({ question }) => {
    //       this.router.navigate([
    //         'questions',
    //         question.id,
    //         'visualization-type',
    //       ]);
    //     },
    //   });
    // } else {
    //   this.questionDataService
    //     .updateQuestion({ ...this.question(), ...value } as QuestionType)
    //     .subscribe({
    //       next: ({ question }) => {
    //         console.log('question', question);
    //         this.router.navigate([
    //           'questions',
    //           question.id,
    //           'visualization-type',
    //         ]);
    //       },
    //     });
    // }
  }
}
