import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { VisualizationTypeComponent } from '@hela/survey-ui/components';

@Component({
  selector: 'hls-visualization-type-page',
  imports: [CommonModule, VisualizationTypeComponent],
  templateUrl: './visualization-type-page.component.html',
  styleUrl: './visualization-type-page.component.scss',
})
export class VisualizationTypePageComponent {}
