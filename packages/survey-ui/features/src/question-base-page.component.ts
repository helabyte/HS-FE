import { Location } from '@angular/common';
import {
  Component, inject, input
} from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { QuestionType } from '@hela/survey-ui/utils';


@Component({
  standalone: true,
  template: ``,
})
export abstract class QuestionBasePageComponent {
  id = input<string>();
  question = input<QuestionType>();

  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private router = inject(Router);
  private localize = inject(LocalizeRouterService);
  private location = inject(Location);

  nextRoute = '';

  onDraft(value: Partial<QuestionType>) {
    if (this.question()) {
      this.realtimeDatabaseService
        .update(
          'questions',
          this.id(),
          value
        )
        .then(() => this.navigateDraft());
    } else {
      this.realtimeDatabaseService
        .create(
          'questions',
          value
        )
        .then(() => this.navigateDraft());
    }
  }

  onSubmit(value: Partial<QuestionType>) {
    if (!this.question()) {
      this.realtimeDatabaseService
        .create(
          'questions',
          value
        )
        .then((result) => this.navigateNextStep(result.id));
    } else {
      this.realtimeDatabaseService
        .update<QuestionType>(
          'questions',
          this.id(),
          value
        )
        .then(() => this.navigateNextStep());
    }
  }

  navigateDraft(){
    void this.router.navigate([
      this.localize.parser.currentLang,
      'questions',
    ]);
  }

  navigateNextStep(id?: string){
    void this.router.navigate([
      this.localize.parser.currentLang,
      'questions',
      id || this.id(),
      this.nextRoute,
    ]);
  }

  navigatePrevStep(){
    this.location.back()
  }
}
