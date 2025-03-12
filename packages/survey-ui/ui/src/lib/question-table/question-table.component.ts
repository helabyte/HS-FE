import { DatePipe } from '@angular/common';
import { Component, effect, input, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { QuestionType } from '@hela/survey-shared';

@Component({
  selector: 'hls-question-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
  ],
  templateUrl: './question-table.component.html',
  styleUrl: './question-table.component.scss',
})
export class QuestionTableComponent {
  data = input<QuestionType[]>([]);
  displayedColumns: string[] = [
    'index',
    'questionText',
    'chart',
    'startDate',
    'endDate',
    'action',
  ];
  dataSource = new MatTableDataSource<QuestionType>([]);

  paginator = viewChild(MatPaginator);

  dataEff = effect(() => {
    if (this.data()) {
      this.dataSource = new MatTableDataSource<QuestionType>(this.data());
      if (this.paginator()) {
        this.dataSource.paginator = this.paginator();
      }
    }
  });
}
