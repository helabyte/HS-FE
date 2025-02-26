import { Component, effect, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { QuestionBasePageComponent } from '../question-base-form.component';

@Component({
  selector: 'hls-visualization-type',
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './visualization-type.component.html',
  styleUrl: './visualization-type.component.scss',
})
export class VisualizationTypeComponent extends QuestionBasePageComponent {
  chartType = input<string>();

  override form = new FormGroup({
    chartType: new FormControl('', Validators.required),
  });

  chartTypeEff = effect(() => {
    this.form.patchValue({ chartType: this.chartType() || 'pie' });
  });

  selectChartType(type: string): void {
    this.form.get('chartType')?.setValue(type);
  }
}
