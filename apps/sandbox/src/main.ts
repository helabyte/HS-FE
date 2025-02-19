import { isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@hela/survey-ui/features';

import { AppComponent } from './app/app.component';
import { makeServer } from './mirage/config';

if (isDevMode()) {
  makeServer({ environment: 'development' });
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
