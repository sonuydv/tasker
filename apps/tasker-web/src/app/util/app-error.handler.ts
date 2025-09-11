import { ErrorHandler, inject } from '@angular/core';
import { NotificationService } from '../features/shared/notification.service';
import { AppError } from './app.error';


export class AppErrorHandler extends ErrorHandler{

  private readonly notification = inject(NotificationService);

  override handleError(error: unknown): void {
    if(error instanceof AppError) {
      this.notification.error(error.message);
    }
    super.handleError(error);
  }
}
