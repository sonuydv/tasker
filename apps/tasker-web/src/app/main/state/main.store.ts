import { createPropertySelectors, State } from '@ngxs/store';
import { MainStoreModel } from './main.store.model';
import { Injectable } from '@angular/core';


@State<MainStoreModel>({
  name: 'main',
  defaults: {
    userInfo: undefined
  }
})
@Injectable()
export class MainStore{

  static slices
    = createPropertySelectors<MainStoreModel>(MainStore);




}
