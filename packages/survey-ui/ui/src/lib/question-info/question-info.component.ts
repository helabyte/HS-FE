import { DatePipe } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

import { QuestionChangeLogType, QuestionType } from '@hela/survey-shared';

@Component({
  selector: 'hls-question-info',
  imports: [MatCardModule, MatListModule, DatePipe, RouterLink],
  templateUrl: './question-info.component.html',
  styleUrl: './question-info.component.scss',
})
export class QuestionInfoComponent {
  question = input<QuestionType>();
  logs = input<QuestionChangeLogType[]>();

  logsEff = effect(() => console.log(this.logs()));
}
