import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { VisualizationTypeComponent } from '@hela/survey-ui/components';
import { QuestionDataService } from '@hela/survey-ui/services';
import { QuestionType } from '@hela/survey-ui/types';

@Component({
  selector: 'hls-visualization-type-page',
  imports: [VisualizationTypeComponent],
  templateUrl: './visualization-type-page.component.html',
  styleUrl: './visualization-type-page.component.scss',
})
export class VisualizationTypePageComponent {
  question = input<QuestionType>();

  private questionDataService = inject(QuestionDataService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      console.log('question', this.question());
    });
  }

  onSubmit(value: Pick<QuestionType, 'chartType'>) {
    this.questionDataService
      .updateQuestion({ ...this.question(), chartType: value.chartType })
      .subscribe({
        next: ({ question }) => {
          console.log('res', question);
          this.router.navigate(['questions', question.id, 'poll-settings']);
        },
      });
  }
}
