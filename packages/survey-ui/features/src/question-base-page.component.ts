import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { QuestionType } from '@hela/survey-shared';
import { QUESTION_DATA_SERVICE_TOKEN } from '@hela/survey-ui/utils';

@Component({
  standalone: true,
  template: ``,
})
export abstract class QuestionBasePageComponent {
  id = input<string>();
  question = input<QuestionType>();

  private questionDataService = inject(QUESTION_DATA_SERVICE_TOKEN);
  private router = inject(Router);
  private localize = inject(LocalizeRouterService);

  nextRoute = '';

  onDraft(value: Partial<QuestionType>) {
    if (this.question()) {
      this.questionDataService
        .updateQuestion(this.id(), { ...this.question(), ...value })
        .subscribe({
          next: () => this.navigateDraft(),
        });
    } else {
      const { questionText, options } = value;
      this.questionDataService
        .createQuestion({ questionText, options })
        .subscribe({
          next: () => this.navigateDraft(),
        });
    }
  }

  onSubmit(value: Partial<QuestionType>) {
    if (!this.question()) {
      const { questionText, options } = value;
      this.questionDataService
        .createQuestion({ questionText, options })
        .subscribe({
          next: (value) => this.navigateNextStep(value._id),
        });
    } else {
      this.questionDataService
        .updateQuestion(this.id(), { ...this.question(), ...value })
        .subscribe({
          next: () => this.navigateNextStep(),
        });
    }
  }

  navigateDraft() {
    void this.router.navigate([this.localize.parser.currentLang, 'questions']);
  }

  navigateNextStep(id?: string) {
    void this.router.navigate([
      this.localize.parser.currentLang,
      'questions',
      id || this.id(),
      this.nextRoute,
    ]);
  }
}
