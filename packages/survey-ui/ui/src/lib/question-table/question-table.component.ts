import { AfterViewInit, Component, effect, input, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { QuestionType } from '@hela/survey-ui/utils';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hls-question-table',
  standalone: true, // Added standalone: true
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, RouterLink],
  templateUrl: './question-table.component.html',
  styleUrl: './question-table.component.scss',
})
export class QuestionTableComponent {
  data = input<QuestionType[]>([]);
  displayedColumns: string[] = ['index', 'questionText', 'action']; // Added 'index'
  dataSource = new MatTableDataSource<QuestionType>([]); // Initialize here

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
