import { Action, createPropertySelectors, State, StateContext } from '@ngxs/store';
import { TasksStoreModel } from './tasks-store.model';
import { Injectable } from '@angular/core';
import { TasksActions } from './tasks.actions';

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

}
