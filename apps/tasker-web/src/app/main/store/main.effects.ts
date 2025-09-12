import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { MainActions } from './main.actions';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { LocalStore } from '../../util/local.store';
import { ConfirmService } from '../../features/shared/confirm.service';
import { Router } from '@angular/router';
import { SocketService } from '../../socket/socket.service';
import { TaskModel } from '@tasker/shared';
import { TasksActions } from '../../features/tasks/store';
import { MainStore } from './main.store';

@Injectable()
export class MainEffects {
  private readonly store = inject(Store);
  private readonly localStore = inject(LocalStore);
  private readonly confirm = inject(ConfirmService);
  private readonly router = inject(Router);

  private readonly socket = inject(SocketService);

  constructor() {
    const actions$ = inject(Actions);

    /*On App start*/
    actions$
      .pipe(
        ofActionDispatched(MainActions.OnMainNavigated),
        switchMap((action) => {
          const user = this.localStore.getSessionData();
          return this.store.dispatch(
            new MainActions.LoadSessionInfo(user!)
          ).pipe(map(() => user!));
        }),
        tap((user) => {
          this.socket.connect();
        }),
      )
      .subscribe();



    /*On Logout button clicked*/
    actions$
      .pipe(
        ofActionDispatched(MainActions.OnLogoutClicked),
        switchMap((action) =>
          this.confirm
            .confirm({
              title: 'Confirm Logout',
              message: 'Are you sure you want to logout?',
            })
            .pipe(filter((res) => !!res))
        ),
        switchMap(() => {
          this.localStore.removeSessionData();
          return this.router.navigateByUrl('/auth');
        })
      )
      .subscribe();

    /*Socket event : on connect*/
    this.socket.onEvent('connect')
      .pipe(
        withLatestFrom(this.store.select(MainStore.slices.userInfo)),
        tap(([res,user])=>this.socket.emit('join',user?.id)))
      .subscribe()

    /*On Socket Event : active-sessions updated*/
    this.socket
      .onEvent<{count:number}>('active-sessions')
      .pipe(
        switchMap((res) =>
          this.store.dispatch(new MainActions.OnActiveSessionsUpdated(res.count))
        )
      )
      .subscribe();

    /*On socket Event : task created*/
    this.socket.onEvent<TaskModel>('task:created')
      .pipe(
        switchMap(task=>
          this.store.dispatch(new TasksActions.AddTaskSocket(task)))
      )
      .subscribe();

    /*On socket Event : task updated*/
    this.socket.onEvent<TaskModel>('task:updated')
      .pipe(
        switchMap(task=>
          this.store.dispatch(new TasksActions.UpdateTaskSocket(task)))
      )
      .subscribe();

    /*On socket Event : task deleted*/
    this.socket.onEvent<{taskId:string}>('task:deleted')
      .pipe(
        switchMap(task=>
          this.store.dispatch(new TasksActions.OnDeleteTaskSocket(task.taskId)))
      )
      .subscribe();
  }
}
