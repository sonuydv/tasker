import { Action, createPropertySelectors, State, StateContext } from '@ngxs/store';
import { MainStoreModel } from './main.store.model';
import { Injectable } from '@angular/core';
import { MainActions } from './main.actions';


@State<MainStoreModel>({
  name: 'main',
  defaults: {
    userInfo: undefined,
    activeSessions:0
  }
})
@Injectable()
export class MainStore{

  static slices
    = createPropertySelectors<MainStoreModel>(MainStore);


  @Action(MainActions.LoadSessionInfo)
  loadSessionInfo(ctx:StateContext<MainStoreModel>, {user}:MainActions.LoadSessionInfo){
    ctx.patchState({userInfo:user});
  }

  @Action(MainActions.OnActiveSessionsUpdated)
  onActiveSessionsUpdated(ctx:StateContext<MainStoreModel>,
                          {count}:MainActions.OnActiveSessionsUpdated){
    ctx.patchState({activeSessions:count});
  }


}
