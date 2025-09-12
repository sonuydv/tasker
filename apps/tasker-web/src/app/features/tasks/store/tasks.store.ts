import { Action, createPropertySelectors, State, StateContext } from '@ngxs/store';
import { TasksStoreModel } from './tasks-store.model';
import { inject, Injectable } from '@angular/core';
import { TasksActions } from './tasks.actions';
import { TasksApi } from '../api/tasks.api';
import { delay, tap } from 'rxjs';
import { TaskModel } from '@tasker/shared';

@State<TasksStoreModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    isLoading: false,
    error:undefined
  },
})
@Injectable()
export class TasksStore {

  static slices = createPropertySelectors<TasksStoreModel>(TasksStore);

  private readonly taskApi = inject(TasksApi);

  @Action(TasksActions.OnTasksLoadSuccess)
  onTasksLoadSuccess(ctx: StateContext<TasksStoreModel>, action: TasksActions.OnTasksLoadSuccess) {
    ctx.patchState({
      tasks: action.tasks,
      isLoading: false,
      error: undefined
    });
  }

  @Action(TasksActions.OnTaskLoadFailure)
  onTaskLoadFailure(ctx: any, action: TasksActions.OnTaskLoadFailure) {
    ctx.patchState({
      isLoading: false,
      error: action.error
    });
  }

  @Action(TasksActions.AddTask)
  addTask(ctx: StateContext<TasksStoreModel>,{task}:TasksActions.AddTask) {
    return this.taskApi.createTask(task).pipe(
      tap(task=>ctx.patchState({tasks:[...ctx.getState().tasks,task]}))
    );
  }

  @Action(TasksActions.UpdateTask)
  updateTask(ctx:StateContext<TasksStoreModel>,{taskId,changes}:TasksActions.UpdateTask){
    return this.taskApi.updateTask(taskId,changes)
      .pipe(
        tap(task=>ctx.patchState({tasks:this.updatedTasks(task,ctx.getState().tasks)}))
      )
  }

  @Action(TasksActions.DeleteTask)
  deleteTask(ctx:StateContext<TasksStoreModel>,{taskId}:TasksActions.DeleteTask){
   return this.taskApi.deleteTask(taskId).pipe(
     delay(500),
     tap(()=>ctx.patchState({tasks:this.deletedTasks(taskId,ctx.getState().tasks)}))
   )
  }


  @Action(TasksActions.AddTaskSocket)
  addTaskSocket(ctx: StateContext<TasksStoreModel>,{task}:TasksActions.AddTaskSocket) {
    const exists = ctx.getState().tasks.find(item => item.id === task.id);
    if (exists) {
      return;
    }
    ctx.patchState({
      tasks: [...ctx.getState().tasks, task]
    });
  }

  @Action(TasksActions.UpdateTaskSocket)
  updateTaskSocket(ctx:StateContext<TasksStoreModel>,{task}:TasksActions.UpdateTaskSocket){
    ctx.patchState({tasks:this.updatedTasks(task,ctx.getState().tasks)});
  }

  @Action(TasksActions.OnDeleteTaskSocket)
  onDeleteTaskSocket(ctx:StateContext<TasksStoreModel>,{taskId}:TasksActions.OnDeleteTaskSocket){
    ctx.patchState({tasks:this.deletedTasks(taskId,ctx.getState().tasks)});
  }


  private updatedTasks(task:TaskModel,tasks:TaskModel[]){
    return tasks.map(item => item.id === task.id ? { ...item, ...task} : item);
  }

  private deletedTasks(taskId:string,tasks:TaskModel[]){
    return tasks.filter(item => item.id !== taskId);
  }

}
