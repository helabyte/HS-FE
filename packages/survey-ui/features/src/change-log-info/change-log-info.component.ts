import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { QuestionChangeLogType, QuestionType } from '@hela/survey-shared';
import {
  PollSettingsComponent,
  QuestionAssignmentComponent,
  QuestionFormComponent,
  VisualizationTypeComponent,
} from '@hela/survey-ui/ui';

@Component({
  selector: 'hls-change-log-info',
  imports: [
    QuestionFormComponent,
    DatePipe,
    MatCardModule,
    VisualizationTypeComponent,
    PollSettingsComponent,
    QuestionAssignmentComponent,
  ],
  templateUrl: './change-log-info.component.html',
  styleUrl: './change-log-info.component.scss',
})
export class ChangeLogInfoComponent {
  changelog = input<QuestionChangeLogType>();
}
