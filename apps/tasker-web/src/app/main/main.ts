import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
  inject,
  NgModule,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { MainActions, MainEffects, MainStore } from './store';
import { Tasks } from '../features/tasks/tasks';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import {SocketIoModule } from 'ngx-socket-io';
import { SocketService } from '../socket/socket.service';

@NgModule({
  imports:[
    NgxsModule.forFeature([MainStore]),
    SocketIoModule.forRoot({url:'/'})
  ],
  providers:[SocketService]
})
export class MainModule {}

@Component({
  selector: 'app-main',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MainModule, Tasks, MatIcon, MatIconButton, MatTooltip],
  providers: [MainEffects],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly socket = inject(SocketService);

  /*Initialize effects*/
  private readonly mainEffects = inject(MainEffects);

  protected user = this.store.selectSignal(MainStore.slices.userInfo);
  protected activeSessions = this.store.selectSignal(
    MainStore.slices.activeSessions
  );

  ngOnInit() {
    this.store.dispatch(new MainActions.OnMainNavigated());
  }

  protected onLogout() {
    this.store.dispatch(new MainActions.OnLogoutClicked());
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
