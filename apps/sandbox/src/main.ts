import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { makeServer } from './mirage/config';

if (isDevMode()) {
  makeServer({ environment: 'development' });
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
