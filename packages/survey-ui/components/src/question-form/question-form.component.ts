import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
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
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      questionText: ['', Validators.required],
      options: this.fb.array([]), // Start with an empty FormArray
    });

    // Add a default option (optional)
    this.addOption();
  }

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
    } else {
      this.questionForm.markAllAsTouched();
    }
  }
}
