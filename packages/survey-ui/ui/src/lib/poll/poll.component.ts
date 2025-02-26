import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'hls-poll',
  imports: [CommonModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
})
export class PollComponent {
  pollOptions = [
    { label: 'JavaScript', votes: 1326, percentage: 53 },
    { label: 'Python', votes: 348, percentage: 14 },
    { label: 'Java', votes: 683, percentage: 27 },
    { label: 'C++', votes: 101, percentage: 6 },
  ];

  getBarColorClass(label: string): string {
    switch (label) {
      case 'JavaScript':
        return 'bg-blue-600'; // Darker blue
      case 'Python':
        return 'bg-sky-500'; // Lighter blue, like in the image
      case 'Java':
        return 'bg-sky-500';
      case 'C++':
        return 'bg-sky-500';
      default:
        return 'bg-gray-300'; // Default color if needed
    }
  }
}
