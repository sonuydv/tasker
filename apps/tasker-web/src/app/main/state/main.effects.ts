import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { MainActions } from './main.actions';
import { switchMap, tap } from 'rxjs';
import { LocalStore } from '../../util/local.store';



@Injectable()
export class MainEffects{

  private readonly store = inject(Store);
  private readonly localStore = inject(LocalStore);

  constructor() {
    const actions$ = inject(Actions);

    /*On App start*/
    actions$.pipe(
      ofActionDispatched(MainActions.OnMainNavigated),
      switchMap(action=>
        this.store.dispatch(
          new MainActions.LoadSessionInfo(this.localStore.getSessionData()!)))
    ).subscribe();


  }

}
