import { Route } from '@angular/router';
import { authRouteGuard, homeRouteGuard } from './route.guards';

export const appRoutes: Route[] = [
  {
    path:'',
    loadComponent: () => import('./main/main').then(m => m.Main),
    canActivate:[homeRouteGuard]
  },
  {
    path:'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
    canActivate:[authRouteGuard]
  },
];
