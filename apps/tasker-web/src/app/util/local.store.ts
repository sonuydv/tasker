import { Injectable } from '@angular/core';
import { UserModel } from '@tasker/shared';


@Injectable({
  providedIn:'root'
})
export class LocalStore{

  static readonly SESSION = 'session';

  getSessionData():UserModel | null {
    return this.get(LocalStore.SESSION);
  }

  setSessionData(user:UserModel):void {
    this.set(LocalStore.SESSION, user);
  }

  removeSessionData():void {
    this.remove(LocalStore.SESSION);
  }


  get<T>(key:string):T|null {
    const item = localStorage.getItem(key);
    if(!item) return null;
    return JSON.parse(item) as T;
  }

  set<T>(key:string, value:T):void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key:string):void {
    localStorage.removeItem(key);
  }

}
