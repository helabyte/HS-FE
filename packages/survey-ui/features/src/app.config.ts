import { Location } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withDisabledInitialNavigation,
} from '@angular/router';

import {
  LocalizeParser,
  LocalizeRouterSettings,
  withLocalizeRouter,
} from '@gilsdav/ngx-translate-router';
import { LocalizeRouterHttpLoader } from '@gilsdav/ngx-translate-router-http-loader';
import {
  provideTranslateService,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { APP_CONFIG_TOKEN, AppConfigType } from '@hela/survey-ui/utils';

import { appRoutes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

export function createTranslateRouteLoader(
  translate: TranslateService,
  location: Location,
  settings: LocalizeRouterSettings,
  http: HttpClient
): LocalizeParser {
  //Type added
  return new LocalizeRouterHttpLoader(
    translate,
    location,
    settings,
    http,
    './locales.json'
  );
}

export const appConfig = (config: AppConfigType): ApplicationConfig => ({
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withDisabledInitialNavigation(),
      withLocalizeRouter(appRoutes, {
        parser: {
          provide: LocalizeParser,
          useFactory: createTranslateRouteLoader,
          deps: [
            TranslateService,
            Location,
            LocalizeRouterSettings,
            HttpClient,
          ],
        },
        initialNavigation: true,
        // alwaysSetPrefix: true,
        // useCachedLang: false,
      })
    ),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: APP_CONFIG_TOKEN, useValue: config },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
});
