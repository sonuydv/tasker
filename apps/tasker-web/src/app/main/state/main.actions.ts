

export namespace MainActions{

  export class OnMainNavigated{
    static readonly type = '[MainStore] On Main Navigated';
  }

  export class SetUserInfo{
    static readonly type = '[MainStore] Set User Info';
    constructor(public userInfo:any){}
  }

}
