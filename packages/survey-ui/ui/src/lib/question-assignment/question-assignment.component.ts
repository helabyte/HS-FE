import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgForOf, NgIf } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


import { QuestionBasePageComponent } from '../question-base-form.component';
import { QuestionType } from '@hela/survey-shared';

@Component({
  selector: 'hls-question-assignment',
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgForOf,
    NgIf,
    MatCheckboxModule,
    MatCardModule,
  ],
  templateUrl: './question-assignment.component.html',
  styleUrl: './question-assignment.component.scss',
})
export class QuestionAssignmentComponent extends QuestionBasePageComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  surveyAssignment = input<string>();
  topics = input<string[]>();
  additionalOptions = input<QuestionType['additionalOptions']>();

  override form = new FormGroup({
    surveyAssignment: new FormControl('standalone'),
    topics: new FormControl([], { nonNullable: true }),
    additionalOptions: new FormGroup({
      searchable: new FormControl<boolean>(false),
      reuse: new FormControl<boolean>(false),
    }),
  });

  surveyAssignmentEff = effect(() =>
    this.form.patchValue({
      surveyAssignment: this.surveyAssignment() || 'standalone',
    })
  );

  topicEff = effect(() =>
    this.form.patchValue({
      topics: this.topics() || [],
    })
  );

  additionalOptionsEff = effect(() =>
    this.form.patchValue({
      additionalOptions: this.additionalOptions(),
    })
  );

  topicInputControl = new FormControl('');

  addTopic(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.topicsControl.patchValue([...this.topicsControl.value, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.topicInputControl.setValue('');
  }

  removeTopic(topic: string): void {
    const topics = (this.form.get('topics').value || []) as string[];
    const index = topics.indexOf(topic);
    if (index >= 0) {
      topics.splice(index, 1);
    }
    this.form.get('topics').patchValue(topics);
  }

  get topicsControl() {
    return this.form.get('topics') as FormControl;
  }
}
