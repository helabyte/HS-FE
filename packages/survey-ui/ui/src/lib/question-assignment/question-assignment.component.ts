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

import { QuestionType, SafeAnyType } from '@hela/survey-ui/utils';

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
export class QuestionAssignmentComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  surveyAssignment = input<string>();
  topics = input<string[]>();
  additionalOptions = input<QuestionType['additionalOptions']>();

  submitEvent = output<
    | Partial<
        Pick<QuestionType, 'surveyAssignment' | 'topics' | 'additionalOptions'>
      >
    | SafeAnyType
  >();

  questionForm = new FormGroup({
    surveyAssignment: new FormControl('standalone'),
    topics: new FormControl([], { nonNullable: true }),
    additionalOptions: new FormGroup({
      searchable: new FormControl(false),
      reuse: new FormControl(false),
    }),
  });

  surveyAssignmentEff = effect(() =>
    this.questionForm.patchValue({
      surveyAssignment: this.surveyAssignment(),
    })
  );

  topicEff = effect(() =>
    this.questionForm.patchValue({
      topics: this.topics() || [],
    })
  );

  additionalOptionsEff = effect(() =>
    this.questionForm.patchValue({
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
    const topics = (this.questionForm.get('topics').value || []) as string[];
    const index = topics.indexOf(topic);
    if (index >= 0) {
      topics.splice(index, 1);
    }
    this.questionForm.get('topics').patchValue(topics);
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      console.log('Question Form:', this.questionForm.value);
      this.submitEvent.emit(this.questionForm.value);
      // Handle form submission logic here
    }
  }

  get topicsControl() {
    return this.questionForm.get('topics') as FormControl;
  }
}
