import { NgIf } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import * as d3 from 'd3';

import { QuestionType, SafeAnyType } from '@hela/survey-ui/utils';

import { BarChartDirective } from '../directives/bar-chart.directive';
import { LineChartDirective } from '../directives/line-chart.directive';
import { PieChartDirective } from '../directives/pie-chart.directive';
import { PollComponent } from '../poll/poll.component';

@Component({
  selector: 'hls-chart-viewer',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgIf,
    MatButtonModule,
    PollComponent,
    BarChartDirective,
    LineChartDirective,
    PieChartDirective,
  ],
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.scss'],
})
export class ChartViewerComponent {
  chartData = input<QuestionType>();

  pollData = computed(() => {
    if (this.chartData()?.options) {
      const totalVotes = this.chartData().options.reduce(
        (sum, option) => sum + (option.votes ?? 0),
        0
      );

      return this.chartData().options.map((option) => ({
        label: option.label,
        votes: option.votes ?? 0,
        percentage:
          totalVotes > 0
            ? Math.round(((option.votes ?? 0) / totalVotes) * 100)
            : 0,
      }));
    }
    return [];
  });
}
