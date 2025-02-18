import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'hls-poll-settings',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './poll-settings.component.html',
  styleUrl: './poll-settings.component.scss',
})
export class PollSettingsComponent {
  pollSettingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pollSettingsForm = this.fb.group({
      resultsVisibility: [true],
      public: [false],
      startDay: [''],
      endDay: [''],
    });
  }

  onSubmit(): void {
    if (this.pollSettingsForm.valid) {
      console.log('Poll Settings Form:', this.pollSettingsForm.value);
      // Handle form submission logic here
    }
  }
}
