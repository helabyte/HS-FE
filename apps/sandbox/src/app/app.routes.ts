import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@hela/survey-ui/features').then(
        (c) => c.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@hela/survey-ui/features').then(
            (c) => c.QuestionFormPageComponent
          ),
      },
      {
        path: 'visualization-type',
        loadComponent: () =>
          import('@hela/survey-ui/features').then(
            (c) => c.VisualizationTypePageComponent
          ),
      },
      {
        path: 'poll-settings',
        loadComponent: () =>
          import('@hela/survey-ui/features').then(
            (c) => c.PollSettingsPageComponent
          ),
      },
      {
        path: 'question-assignment',
        loadComponent: () =>
          import('@hela/survey-ui/features').then(
            (c) => c.QuestionAssignmentPageComponent
          ),
      },
    ],
  },
];
