import { Route } from '@angular/router';

import { questionResolver } from './question.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shell/shell.component').then((c) => c.ShellComponent),
    children: [
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
            path: 'my-account',
            loadComponent: () =>
              import('./my-account-page/my-account-page.component').then(
                (c) => c.MyAccountPageComponent
              ),
          },
          {
            path: 'questions',
            loadComponent: () =>
              import('./question-layout/question-layout.component').then(
                (c) => c.QuestionLayoutComponent
              ),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./questions-page/questions-page.component').then(
                    (c) => c.QuestionsPageComponent
                  ),
              },
              {
                path: 'create',
                loadComponent: () =>
                  import(
                    './question-form-page/question-form-page.component'
                  ).then((c) => c.QuestionFormPageComponent),
              },
              {
                path: ':id',
                resolve: {
                  question: questionResolver,
                },
                runGuardsAndResolvers: 'always',
                children: [
                  {
                    path: '',
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
                  {
                    path: 'viewer',
                    loadComponent: () =>
                      import(
                        './question-viewer-page/question-viewer-page.component'
                      ).then((c) => c.QuestionViewerPageComponent),
                  },
                ],
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
