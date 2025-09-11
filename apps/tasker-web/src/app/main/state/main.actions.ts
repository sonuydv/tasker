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

  export class SetUserInfo{
    static readonly type = '[MainStore] Set User Info';
    constructor(public userInfo:any){}
  }

}
