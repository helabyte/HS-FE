import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

import { RealtimeDatabaseService } from '@hela/survey-ui/data-access';
import { VisualizationTypeComponent } from '@hela/survey-ui/ui';
import { QuestionType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-visualization-type-page',
  imports: [VisualizationTypeComponent],
  templateUrl: './visualization-type-page.component.html',
  styleUrl: './visualization-type-page.component.scss',
})
export class VisualizationTypePageComponent {
  id = input<string>();
  question = input<QuestionType>();

  private realtimeDatabaseService = inject(RealtimeDatabaseService);
  private router = inject(Router);
  private localize = inject(LocalizeRouterService);

  constructor() {
    effect(() => {
      console.log('question', this.question());
    });
  }

  onSubmit(value: Pick<QuestionType, 'chartType'>) {
    this.realtimeDatabaseService
      .update('questions', this.id(), value)
      .then(() =>
        this.router.navigate([
          this.localize.parser.currentLang,
          'questions',
          this.id(),
          'poll-settings',
        ])
      );
  }
}
