import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'hls-visualization-type',
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './visualization-type.component.html',
  styleUrl: './visualization-type.component.scss',
})
export class VisualizationTypeComponent {
  visualizationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.visualizationForm = this.fb.group({
      chartType: ['', Validators.required], // Added chartType control
    });
  }

  selectChartType(type: string): void {
    this.visualizationForm.get('chartType')?.setValue(type);
  }

  onSubmit(): void {
    if (this.visualizationForm.valid) {
      console.log('Form Value:', this.visualizationForm.value);
      // Here you would handle the form submission (e.g., send data to an API)
    }
  }
}
