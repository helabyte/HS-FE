import { NgForOf, NgIf } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './question-assignment.component.html',
  styleUrl: './question-assignment.component.scss',
})
export class QuestionAssignmentComponent {
  surveyAssignment = input<string>();
  topics = input<string[]>();
  additionalOptions = input<string>();

  submitEvent = output<
    Partial<{
      surveyAssignment: string;
      topics: string[];
      additionalOptions: string;
    }>
  >();

  questionForm = new FormGroup({
    surveyAssignment: new FormControl('standalone'),
    topics: new FormControl([]),
    additionalOptions: new FormControl('searchable'),
  });

  surveyAssignmentEff = effect(() =>
    this.questionForm.patchValue({
      surveyAssignment: this.surveyAssignment(),
    })
  );

  topicEff = effect(() =>
    this.questionForm.patchValue({
      topics: this.topics(),
    })
  );

  additionalOptionsEff = effect(() =>
    this.questionForm.patchValue({
      additionalOptions: this.additionalOptions(),
    })
  );

  topicInputControl = new FormControl('');

  addTopic(): void {
    const topics = (this.questionForm.get('topics').value || []) as string[];
    const topicValue = this.topicInputControl.value?.trim();
    if (topicValue) {
      topics.push(topicValue);
      this.topicInputControl.setValue('');
    }
    this.questionForm.get('topics').patchValue(topics);
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
