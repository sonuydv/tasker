import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngxs/store';



@Injectable()
export class MainEffects{

  constructor() {
    const actions$ = inject(Actions);
  }

}
