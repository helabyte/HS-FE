import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@hela/survey-ui/features';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig(environment)).catch((err) =>
  console.error(err)
);
