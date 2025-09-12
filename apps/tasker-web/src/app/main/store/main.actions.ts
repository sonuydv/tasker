import { UserModel } from '@tasker/shared';


export namespace MainActions{

  export class OnMainNavigated{
    static readonly type = '[MainStore] On Main Navigated';
  }

  export class LoadSessionInfo{
    static readonly type = '[MainStore] Load Session Info';
    constructor(
      public user:UserModel
    ) {
    }
  }

  export class OnLogoutClicked{
    static readonly type = '[MainStore] Logout Clicked';
  }

  export class OnActiveSessionsUpdated{
    static readonly type = '[MainStore] Active Sessions Updated';
    constructor(
      public count:number
    ) {
    }
  }

}
