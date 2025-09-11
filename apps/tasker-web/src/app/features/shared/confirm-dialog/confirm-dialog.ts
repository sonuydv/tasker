import { Component, Inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

export interface ConfirmConfig {
  title:string;
  message:string;
  negativeBtn?:string;
  positionBtn?:string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatCardActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmConfig) {}
}
