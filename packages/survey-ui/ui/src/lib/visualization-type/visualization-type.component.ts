import { Component, effect, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { QuestionType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-visualization-type',
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './visualization-type.component.html',
  styleUrl: './visualization-type.component.scss',
})
export class VisualizationTypeComponent {
  chartType = input<string>();
  submitEvent = output<Pick<QuestionType, 'chartType'>>();

  visualizationForm = new FormGroup({
    chartType: new FormControl('', Validators.required),
  });

  chartTypeEff = effect(() => {
    this.visualizationForm.patchValue({ chartType: this.chartType() || 'pie' });
  });

  selectChartType(type: string): void {
    this.visualizationForm.get('chartType')?.setValue(type);
  }

  onSubmit(): void {
    if (this.visualizationForm.valid) {
      console.log('Form Value:', this.visualizationForm.value);
      this.submitEvent.emit(this.visualizationForm.value);
      // Here you would handle the form submission (e.g., send data to an API)
    }
  }
}
