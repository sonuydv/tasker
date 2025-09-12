import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { TasksActions } from './tasks.actions';
import { catchError, filter, finalize, map, switchMap, tap, throwError } from 'rxjs';
import { TasksApi } from '../api/tasks.api';
import { MatDialog } from '@angular/material/dialog';
import { CreateTask } from '../components/create-task/create-task';
import { ConfirmService } from '../../shared/confirm.service';
import { LoaderService } from '../../shared/global-loader/loader.service';


@Injectable()
export class TasksEffects {

  private readonly store = inject(Store);
  private readonly tasksApi = inject(TasksApi);
  private readonly dialog = inject(MatDialog);
  private readonly confirm = inject(ConfirmService);
  private readonly loader = inject(LoaderService);

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



    /*On Click create new task handler*/
    actions$.pipe(
      ofActionDispatched(TasksActions.OnClickCreateNewTask),
      switchMap(action=>
        this.dialog.open(CreateTask).afterClosed())
    ).subscribe();


    /*On Delete task click handler*/
    actions$.pipe(
      ofActionDispatched(TasksActions.OnDeleteTaskRequested),
      switchMap(action=>
        this.confirm.confirm({
          title:'Confirm Delete',
          message:"Are you sure you want to delete the task?"})
          .pipe(filter(res=>!!res),map(()=>action.taskId))
      ),
      tap(()=>this.loader.show()),
      switchMap(taskId=>
        this.store.dispatch(new TasksActions.DeleteTask(taskId))
          .pipe(finalize(()=>this.loader.hide()))
      )
    ).subscribe();

    /*On task status updated requested*/
    actions$.pipe(
      ofActionDispatched(TasksActions.OnTaskStatusUpdateRequest),
      tap(()=>this.loader.show()),
      switchMap(action=>
        this.store.dispatch(new TasksActions.UpdateTask(action.taskId, action.changes))
          .pipe(finalize(()=>this.loader.hide()))
      )
    ).subscribe();

    /*OnTask update request*/
    actions$.pipe(
      ofActionDispatched(TasksActions.OnTaskUpdateRequested),
      switchMap(action=>
        this.dialog.open(CreateTask,{data:action.task}).afterClosed())
    ).subscribe();

  }



}
