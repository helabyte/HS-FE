import { Component } from '@angular/core';

import { PollSettingsComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-poll-settings-page',
  imports: [PollSettingsComponent],
  templateUrl: './poll-settings-page.component.html',
  styleUrl: './poll-settings-page.component.scss',
})
export class PollSettingsPageComponent extends QuestionBasePageComponent {
  override nextRoute = 'question-assignment';
}
