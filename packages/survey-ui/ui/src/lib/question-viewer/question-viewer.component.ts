import { NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QuestionType, SafeAnyType } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-question-viewer',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './question-viewer.component.html',
  styleUrl: './question-viewer.component.scss',
})
export class QuestionViewerComponent implements OnInit {
  questionData = input<QuestionType>();
  viewerForm = new FormGroup({});
  submitEvent = output<SafeAnyType>();

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    if (!this.questionData()) {
      return;
    }

    // Only questionText and options are part of the form now.
    if (this.questionData().questionText) {
      this.viewerForm.addControl(
        'questionText',
        new FormControl({
          value: this.questionData().questionText,
          disabled: true,
        }) // Display, but disabled
      );
    }

    if (this.questionData().options && this.questionData().options.length > 0) {
      const optionsArray = new FormArray([]);
      this.questionData().options.forEach((option: any) => {
        const optionGroup = new FormGroup({});

        if (option.inputType === 'checkbox') {
          optionGroup.addControl('value', new FormControl(false));
        } else if (option.inputType === 'text') {
          optionGroup.addControl('value', new FormControl(''));
        }

        optionGroup.addControl('label', new FormControl(option.label));
        optionGroup.addControl('inputType', new FormControl(option.inputType));

        optionsArray.push(optionGroup);
      });
      this.viewerForm.addControl('options', optionsArray);
    }
  }

  get optionsFormArray(): FormArray {
    return this.viewerForm.get('options') as unknown as FormArray;
  }

  getOptionGroup(index: number): FormGroup {
    return this.optionsFormArray.at(index) as FormGroup;
  }

  castFormGroup(control: AbstractControl) {
    return control as FormGroup;
  }

  onSubmit() {
    this.submitEvent.emit(this.viewerForm.value);
  }
}
