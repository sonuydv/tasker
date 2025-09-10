import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    loadComponent: () => import('./features/tasks/tasks').then(m => m.Tasks)
  },
  {
    path:'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth)
  },
];
