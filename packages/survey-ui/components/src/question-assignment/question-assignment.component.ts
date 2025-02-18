import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
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
  questionForm: FormGroup;
  topicInputControl = new FormControl('');
  topics: string[] = [];

  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      surveyAssignment: ['standalone'],
      topic: [''],
      additionalOptions: ['searchable'],
    });
  }

  addTopic(): void {
    const topicValue = this.topicInputControl.value?.trim();
    if (topicValue) {
      this.topics.push(topicValue);
      this.topicInputControl.setValue('');
    }
  }

  removeTopic(topic: string): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      console.log('Question Form:', this.questionForm.value);
      // Handle form submission logic here
    }
  }
}
