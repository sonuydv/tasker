import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmConfig, ConfirmDialog } from './confirm-dialog/confirm-dialog';


@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private readonly matDialog = inject(MatDialog);

  confirm(config:ConfirmConfig) {
    return this.matDialog.open(ConfirmDialog,{
      data:config
    }).afterClosed();
  }

}
