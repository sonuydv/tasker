import { UserModel } from '@tasker/shared';


export interface MainStoreModel {
  userInfo?:UserModel,
  activeSessions:number
}
