import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MyAccountComponent } from '@hela/survey-ui/components';

@Component({
  selector: 'hls-my-account-page',
  imports: [CommonModule, MyAccountComponent],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {}
