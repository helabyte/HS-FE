import { Component } from '@angular/core';

import { QuestionAssignmentComponent } from '@hela/survey-ui/components';

@Component({
  selector: 'hls-question-assignment-page',
  imports: [QuestionAssignmentComponent],
  templateUrl: './question-assignment-page.component.html',
  styleUrl: './question-assignment-page.component.scss',
})
export class QuestionAssignmentPageComponent {}
