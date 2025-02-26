import { Component } from '@angular/core';

import { QuestionFormComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-question-form-page',
  imports: [QuestionFormComponent],
  templateUrl: './question-form-page.component.html',
  styleUrl: './question-form-page.component.scss',
})
export class QuestionFormPageComponent extends QuestionBasePageComponent {
  override nextRoute = 'visualization-type';
}
