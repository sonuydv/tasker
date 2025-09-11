import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalLoader } from './global-loader';


@Injectable({
  providedIn: 'root',
})
export class LoaderService{
  private readonly matDialog = inject(MatDialog);
  private dialogRef:MatDialogRef<GlobalLoader>;

  show(){
    this.dialogRef = this.matDialog.open(GlobalLoader,{
      disableClose: true
    })
  }

  hide(){
    if(this.dialogRef){
      this.dialogRef.close();
    }
  }

}
