import { Component } from '@angular/core';

import { MyAccountComponent } from '@hela/survey-ui/ui';

@Component({
  selector: 'hls-my-account-page',
  imports: [MyAccountComponent],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent {}
