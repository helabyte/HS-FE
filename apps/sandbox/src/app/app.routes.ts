import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@hela/survey-ui/features').then((c) => c.ModelerComponent),
  },
];
