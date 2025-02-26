import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTimepickerModule } from '@angular/material/timepicker';

import { SafeAnyType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-poll-settings',
  imports: [
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatCardModule,
  ],
  templateUrl: './poll-settings.component.html',
  styleUrl: './poll-settings.component.scss',
})
export class PollSettingsComponent {
  resultsVisibility = input<boolean | null>();
  public = input<boolean | null>();
  startDate = input<Date | null | SafeAnyType>();
  endDate = input<Date | null | SafeAnyType>();

  submitEvent = output<
    Partial<{
      resultsVisibility: boolean;
      public: boolean;
      startDay: Date;
      endDay: Date;
    }>
  >();

  resultsVisibilityEff = effect(() =>
    this.pollSettingsForm.patchValue({
      resultsVisibility: this.resultsVisibility(),
    })
  );

  publicEff = effect(() =>
    this.pollSettingsForm.patchValue({
      public: this.public(),
    })
  );

  startDayEff = effect(() =>
    this.pollSettingsForm.patchValue({
      startDate: this.startDate(),
    })
  );

  endDayEff = effect(() =>
    this.pollSettingsForm.patchValue({
      endDate: this.endDate(),
    })
  );

  pollSettingsForm = new FormGroup({
    resultsVisibility: new FormControl(true),
    public: new FormControl(false),
    startDate: new FormControl<Date>(null),
    endDate: new FormControl<Date>(null),
  });

  onSubmit(): void {
    if (this.pollSettingsForm.valid) {
      console.log('Poll Settings Form:', this.pollSettingsForm.value);
      this.submitEvent.emit(this.pollSettingsForm.value);
      // Handle form submission logic here
    }
  }
}
