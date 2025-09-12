import {
  ApplicationConfig, ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppErrorHandler } from './util/app-error.handler';
import { environment } from '../environments/environment';
import {sessionAuthInterceptor } from './util/http.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore([],
      withNgxsLoggerPlugin({disabled:false}),
      withNgxsReduxDevtoolsPlugin(),
      ),
    provideHttpClient(withInterceptors([sessionAuthInterceptor])),
    {
      provide:'API_URL',
      useValue:environment.apiUrl
    },
    {
      provide:ErrorHandler,
      useClass:AppErrorHandler,
    }
  ],
};
