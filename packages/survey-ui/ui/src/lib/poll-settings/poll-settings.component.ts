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
import { QuestionBasePageComponent } from '../question-base-form.component';

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
export class PollSettingsComponent extends QuestionBasePageComponent{
  resultsVisibility = input<boolean | null>();
  public = input<boolean | null>();
  startDate = input<Date | null | SafeAnyType>();
  endDate = input<Date | null | SafeAnyType>();

  resultsVisibilityEff = effect(() =>
    this.form.patchValue({
      resultsVisibility: this.resultsVisibility(),
    })
  );

  publicEff = effect(() =>
    this.form.patchValue({
      public: this.public(),
    })
  );

  startDayEff = effect(() =>
    this.form.patchValue({
      startDate: this.startDate(),
    })
  );

  endDayEff = effect(() =>
    this.form.patchValue({
      endDate: this.endDate(),
    })
  );

  override form = new FormGroup({
    resultsVisibility: new FormControl(true),
    public: new FormControl(false),
    startDate: new FormControl<Date>(null),
    endDate: new FormControl<Date>(null),
  });

}
