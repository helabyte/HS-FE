import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { QuestionOptionType, SafeAnyType } from '@hela/survey-ui/types';

import { OptionDialogComponent } from '../option-dialog/option-dialog.component';

@Component({
  selector: 'hls-question-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NgClass,
    NgIf,
    NgForOf,
    MatDialogModule,
  ],
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.scss',
})
export class QuestionFormComponent {
  questionText = input<string>();
  options = input<QuestionOptionType[]>();
  submitEvent = output<
    Partial<{
      questionText: string;
      options: { label: string; value: SafeAnyType }[];
    }>
  >();

  questionForm = new FormGroup({
    questionText: new FormControl('', Validators.required),
    options: new FormArray([]),
  });
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  questionTextEff = effect(() => {
    this.questionForm.patchValue({ questionText: this.questionText() || '' });
  });
  optionsEff = effect(() => {
    if (!this.options() && this.options().length === 0) {
      this.addOption();
    } else {
      this.questionForm.patchValue({ options: this.options() || [] });
    }
  });

  get optionForms() {
    return this.questionForm.get('options') as FormArray;
  }

  openDialog(optionIndex: number | null = null): void {
    const isEdit = optionIndex !== null;
    let optionData = null;

    if (isEdit) {
      optionData = this.optionForms.at(optionIndex).value;
    }

    const dialogRef = this.dialog.open(OptionDialogComponent, {
      width: '400px', // Adjust width as needed
      data: {
        isEdit: isEdit,
        option: optionData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (isEdit) {
          // Update existing option
          this.optionForms.at(optionIndex).patchValue(result);
        } else {
          // Add new option
          this.optionForms.push(this.fb.group(result)); // Create a new FormGroup from the result
        }
      }
    });
  }

  addOption(): void {
    this.openDialog();
  }

  removeOption(index: number): void {
    this.optionForms.removeAt(index);
  }

  saveAsDraft(): void {
    console.log('Saving as Draft:', this.questionForm.value);
  }

  continue(): void {
    if (this.questionForm.valid) {
      console.log('Continuing:', this.questionForm.value);
      this.submitEvent.emit(this.questionForm.value);
    } else {
      this.questionForm.markAllAsTouched();
    }
  }
}
