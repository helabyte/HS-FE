import { NgForOf, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SafeAnyType } from '@hela/survey-ui/types';

type InputType = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'hls-option-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    NgIf,
    MatSelectModule,
    NgForOf,
  ],
  templateUrl: './option-dialog.component.html',
  styleUrl: './option-dialog.component.scss',
})
export class OptionDialogComponent implements OnInit {
  optionForm: FormGroup;
  inputTypeControl = new FormControl('text'); // Default input type

  availableInputTypes: InputType[] = [
    { value: 'text', viewValue: 'Text Input' },
    { value: 'checkbox', viewValue: 'Checkbox' },
  ];

  constructor(
    public dialogRef: MatDialogRef<OptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SafeAnyType,
    private fb: FormBuilder
  ) {
    this.optionForm = this.fb.group({
      label: ['', Validators.required], // Option Label
      inputType: ['text'],
      value: [''], // Initial value
    });

    if (data && data.option) {
      this.optionForm.patchValue(data.option);
      this.inputTypeControl.setValue(data.option.inputType);
    }
  }

  ngOnInit(): void {
    this.inputTypeControl.valueChanges.subscribe((value) => {
      this.optionForm.patchValue({ inputType: value });
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.optionForm.valid) {
      this.dialogRef.close(this.optionForm.value);
    } else {
      this.optionForm.markAllAsTouched();
    }
  }

  getInputType() {
    return this.inputTypeControl.value;
  }
}
