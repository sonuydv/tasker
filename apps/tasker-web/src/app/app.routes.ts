import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path:'',
    loadComponent: () => import('./main/main').then(m => m.Main)
  },
  {
    path:'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth)
  },
];
