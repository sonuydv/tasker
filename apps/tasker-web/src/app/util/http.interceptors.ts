import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppError } from './app.error';
import { inject } from '@angular/core';
import { LocalStore } from './local.store';
import { Router } from '@angular/router';



export const sessionAuthInterceptor:HttpInterceptorFn = (req, next)=>{
  const router = inject(Router);
  const local = inject(LocalStore);
  return next(req).pipe(
    catchError((err:HttpErrorResponse)=>{
      if(err.status === 401){
        local.removeSessionData();
        router.navigateByUrl('/auth');
        return throwError(()=>new AppError("Session expired. Please login again."));
      }
      return throwError(()=>new AppError(err?.error?.message??err?.message));
    })
  );
}
