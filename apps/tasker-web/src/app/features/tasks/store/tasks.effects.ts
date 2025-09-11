import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { TasksActions } from './tasks.actions';
import { catchError, switchMap, throwError } from 'rxjs';
import { TasksApi } from '../api/tasks.api';


@Injectable()
export class TasksEffects {

  private readonly store = inject(Store);
  private readonly tasksApi = inject(TasksApi);

  constructor() {
    const actions$ = inject(Actions);

    /*On Tasks Panel Opened*/
    actions$.pipe(
      ofActionDispatched(TasksActions.OnTasksOpened),
      switchMap(action=>
        this.tasksApi.getTasks()),
      switchMap(tasks=>
        this.store.dispatch(new TasksActions.OnTasksLoadSuccess(tasks))),
      catchError(err=>{
        this.store.dispatch(new TasksActions.OnTaskLoadFailure(err.message));
        return throwError(()=>err)
      })
    ).subscribe();

  }

}
