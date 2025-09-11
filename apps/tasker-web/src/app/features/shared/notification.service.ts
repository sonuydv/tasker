import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'info' | 'warn';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private defaultDuration = 4000;

  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, type: ToastType, action?: string, durationMs?: number) {
    const config: MatSnackBarConfig = {
      duration: durationMs ?? this.defaultDuration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['top-center-snackbar', `snack-${type}`], // custom classes
    };

    this.snackBar.open(message, action, config);
  }

  success(message: string, action?: string, durationMs?: number) {
    this.open(message, 'success', action, durationMs);
  }

  error(message: string, action?: string, durationMs?: number) {
    this.open(message, 'error', action, durationMs);
  }

  info(message: string, action?: string, durationMs?: number) {
    this.open(message, 'info', action, durationMs);
  }

  warn(message: string, action?: string, durationMs?: number) {
    this.open(message, 'warn', action, durationMs);
  }
}
