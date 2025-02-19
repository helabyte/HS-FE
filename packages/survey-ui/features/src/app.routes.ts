import { Route } from '@angular/router';

import { questionResolver } from './question.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard-layout/dashboard-layout.component').then(
        (c) => c.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions/create',
      },
      {
        path: 'questions',
        children: [
          {
            path: 'create',
            loadComponent: () =>
              import('./question-form-page/question-form-page.component').then(
                (c) => c.QuestionFormPageComponent
              ),
          },
          {
            path: ':id',
            resolve: {
              question: questionResolver,
            },
            runGuardsAndResolvers: 'always',
            children: [
              {
                path: 'question-form',
                loadComponent: () =>
                  import(
                    './question-form-page/question-form-page.component'
                  ).then((c) => c.QuestionFormPageComponent),
              },
              {
                path: 'visualization-type',
                loadComponent: () =>
                  import(
                    './visualization-type-page/visualization-type-page.component'
                  ).then((c) => c.VisualizationTypePageComponent),
              },
              {
                path: 'poll-settings',
                loadComponent: () =>
                  import(
                    './poll-settings-page/poll-settings-page.component'
                  ).then((c) => c.PollSettingsPageComponent),
              },
              {
                path: 'question-assignment',
                loadComponent: () =>
                  import(
                    './question-assignment-page/question-assignment-page.component'
                  ).then((c) => c.QuestionAssignmentPageComponent),
              },
            ],
          },
        ],
      },
    ],
  },
  /*{
    path: '**',
    redirectTo: '',
  },*/
];
