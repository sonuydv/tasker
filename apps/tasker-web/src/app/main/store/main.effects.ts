import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { MainActions } from './main.actions';
import { filter, switchMap, tap } from 'rxjs';
import { LocalStore } from '../../util/local.store';
import { ConfirmService } from '../../features/shared/confirm.service';
import { Router } from '@angular/router';



@Injectable()
export class MainEffects{

  private readonly store = inject(Store);
  private readonly localStore = inject(LocalStore);
  private readonly confirm = inject(ConfirmService);
  private readonly router = inject(Router);

  constructor() {
    const actions$ = inject(Actions);

    /*On App start*/
    actions$.pipe(
      ofActionDispatched(MainActions.OnMainNavigated),
      switchMap(action=>
        this.store.dispatch(
          new MainActions.LoadSessionInfo(this.localStore.getSessionData()!)))
    ).subscribe();

    /*On Logout button clicked*/
    actions$.pipe(
      ofActionDispatched(MainActions.OnLogoutClicked),
      switchMap(action=>
        this.confirm.confirm(
          {title:'Confirm Logout',message:'Are you sure you want to logout?'})
          .pipe(filter(res=>!!res))
      ),
      switchMap(()=>{
        this.localStore.removeSessionData();
        return this.router.navigateByUrl('/auth');
      })
    ).subscribe();

  }

}
