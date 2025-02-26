import { InjectionToken } from '@angular/core';

import { AppConfigType } from './app-config.type';

export const APP_CONFIG_TOKEN: InjectionToken<AppConfigType> =
  new InjectionToken('Application config');
