import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { PollSettingsComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-poll-settings-page',
  imports: [PollSettingsComponent, MatCardModule],
  templateUrl: './poll-settings-page.component.html',
  styleUrl: './poll-settings-page.component.scss',
})
export class PollSettingsPageComponent extends QuestionBasePageComponent {
  override nextRoute = 'question-assignment';
  override context = 'poll-settings';
}
