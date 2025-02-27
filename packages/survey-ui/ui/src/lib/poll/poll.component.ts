import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'hls-poll',
  imports: [MatProgressBarModule, NgForOf],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
})
export class PollComponent {
  pollOptions = input<{ label: string; votes: number; percentage: number }[]>(
    []
  );
}
