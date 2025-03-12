import { Location } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionType } from '@hela/survey-shared';

@Component({
  standalone: true,
  template: ``,
})
export abstract class QuestionBasePageComponent {
  submitEvent = output<Partial<QuestionType>>();
  draftEvent = output<Partial<QuestionType>>();
  isReadonly = input<boolean>();

  form: FormGroup;

  private location = inject(Location);

  isReadonlyEff = effect(() => this.isReadonly() && this.form.disable());

  saveAsDraft(): void {
    console.log('Saving as Draft:', this.form.value);
    this.draftEvent.emit(this.form.value);
  }

  continue(): void {
    if (this.form.valid) {
      console.log('Continuing:', this.form.value);
      this.submitEvent.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  navigatePrevStep() {
    this.location.back();
  }
}
