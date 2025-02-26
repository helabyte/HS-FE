import { Component } from '@angular/core';

import { QuestionAssignmentComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-question-assignment-page',
  imports: [QuestionAssignmentComponent],
  templateUrl: './question-assignment-page.component.html',
  styleUrl: './question-assignment-page.component.scss',
})
export class QuestionAssignmentPageComponent extends QuestionBasePageComponent {
  override nextRoute = 'viewer';
}
