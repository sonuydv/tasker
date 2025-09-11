import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStore } from './util/local.store';


export const homeRouteGuard:CanActivateFn = () => {
  if(inject(LocalStore).getSessionData()){
    return true;
  }
  inject(Router).navigateByUrl('/auth');
  return false;
}

export const authRouteGuard:CanActivateFn = () => {
  if(!inject(LocalStore).getSessionData()){
    return true;
  }
  inject(Router).navigateByUrl('/');
  return false;
}
