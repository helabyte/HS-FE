import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { QuestionType } from '@hela/survey-shared';
import { QuestionDataService } from '@hela/survey-ui/data-access';
import { QuestionInfoComponent } from '@hela/survey-ui/ui';

@Component({
  selector: 'hls-question-info-page',
  imports: [QuestionInfoComponent],
  templateUrl: './question-info-page.component.html',
  styleUrl: './question-info-page.component.scss',
})
export class QuestionInfoPageComponent {
  question = input<QuestionType>();

  private questionDataService = inject(QuestionDataService);

  logResource = rxResource({
    request: () => this.question()._id,
    loader: (params) => this.questionDataService.getChangelogs(params.request),
  });
}
