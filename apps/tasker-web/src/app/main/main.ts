import { ChangeDetectionStrategy, Component, inject, NgModule, OnInit } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { MainActions, MainEffects, MainStore } from './state';
import { Tasks } from '../features/tasks/tasks';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@NgModule({
  imports:[
    NgxsModule.forFeature([MainStore])
  ],
})
export class MainModule {}

@Component({
  selector: 'app-main',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MainModule,
    Tasks,
    MatIcon,
    MatIconButton],
  providers:[
    MainEffects
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  private readonly store = inject(Store);

  /*Initialize effects*/
  private readonly mainEffects = inject(MainEffects);

  protected user
    = this.store.selectSignal(MainStore.slices.userInfo);

  ngOnInit() {
    this.store.dispatch(new MainActions.OnMainNavigated());
  }
}
