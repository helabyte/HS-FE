import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hls-shell',
  imports: [RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent implements OnInit {
  private translate = inject(TranslateService);
  private localize = inject(LocalizeRouterService);
  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);

  ngOnInit() {
    this.setDirection(this.localize.parser.currentLang);
  }

  private setDirection(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in a browser
      const dir = lang === 'fa' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', dir);
    }
  }
}
