import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@hela/survey-ui/features';

import { environment } from '../environments/environment';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig(environment)).catch((err) =>
  console.error(err)
);
