import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppError } from './app.error';


export const errorInterceptor:HttpInterceptorFn =
  (req, next) => {
    return next(req).pipe(
      catchError(err => throwError(()=>new AppError(err.error.message)))
    );
  }
