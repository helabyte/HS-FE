import { Component } from '@angular/core';

import { VisualizationTypeComponent } from '@hela/survey-ui/ui';

import { QuestionBasePageComponent } from '../question-base-page.component';

@Component({
  selector: 'hls-visualization-type-page',
  imports: [VisualizationTypeComponent],
  templateUrl: './visualization-type-page.component.html',
  styleUrl: './visualization-type-page.component.scss',
})
export class VisualizationTypePageComponent extends QuestionBasePageComponent {
  override nextRoute = 'poll-settings';
}
