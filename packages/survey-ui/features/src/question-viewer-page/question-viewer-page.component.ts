import { NgForOf, NgIf } from '@angular/common';
import { Component, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { ChartViewerComponent, QuestionViewerComponent } from '@hela/survey-ui/components';
import { QuestionType } from '@hela/survey-ui/types';
import { getRandomNumber } from '@hela/survey-ui/utils';

@Component({
  selector: 'hls-question-viewer-page',
  standalone: true,
  imports: [
    QuestionViewerComponent,
    ChartViewerComponent,
    NgForOf,
    MatButtonModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './question-viewer-page.component.html',
  styleUrl: './question-viewer-page.component.scss',
})
export class QuestionViewerPageComponent implements OnInit {
  question = input<QuestionType>();
  submitted = false; // Flag to track submission
  updatedQuestionData: any; // To store updated data for the chart

  questionData = signal<QuestionType | null>(null);

  totalVotes = 2457;
  hoursRemaining = 23;

  ngOnInit() {
    this.questionData.set({
      ...this.question(),
      options: this.question().options?.map(option => ({...option, votes: getRandomNumber(150)})),
    });

    this.updatedQuestionData = this.questionData();
  }

  handleSubmitResponse(response: any) {
    // Create a deep copy of the original question data to avoid modifying the input directly
    const updatedData = JSON.parse(JSON.stringify(this.questionData()));

    // Update vote counts based on the user's response
    response.options.forEach((responseOption: any) => {
      const optionToUpdate = updatedData.options.find(
        (opt: any) => opt.label === responseOption.label
      );

      if (optionToUpdate) {
        if (responseOption.inputType === 'checkbox') {
          // Increment votes if checked, but prevent negative votes
          optionToUpdate.votes += responseOption.value ? 1 : 0; // Only increment if true
          if (optionToUpdate.votes < 0) {
            optionToUpdate.votes = 0;
          }
        } else if (responseOption.inputType === 'text') {
          // For text inputs, add the numeric value of the response, handling potential NaN
          const numericValue = Number(responseOption.value);
          if (!isNaN(numericValue)) {
            optionToUpdate.votes += numericValue;
            if (optionToUpdate.votes < 0) {
              optionToUpdate.votes = 0; //prevent negative votes
            }
          }
        }
      }
    });

    this.updatedQuestionData = updatedData; // Store the updated data
    this.submitted = true; // Show the chart
  }

  submitPoll() {
    this.submitted = true;
  }
}
