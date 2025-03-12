import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { QuestionAssignmentComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-question-assignment-page',
  imports: [QuestionAssignmentComponent, MatCardModule],
  templateUrl: './question-assignment-page.component.html',
  styleUrl: './question-assignment-page.component.scss',
})
export class QuestionAssignmentPageComponent extends QuestionBasePageComponent {
  override nextRoute = 'viewer';
  override context = 'question-assignment';
}
