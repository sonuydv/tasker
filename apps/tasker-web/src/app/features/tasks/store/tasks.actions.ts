import { TaskModel } from '@tasker/shared';


export namespace TasksActions {

  export class OnTasksOpened {
    static readonly type = '[Tasks] On Tasks Opened';
  }

  export class OnTasksLoadSuccess{
    static readonly type = '[Tasks] On Tasks Load Success';
    constructor(public tasks:TaskModel[]) {
    }
  }

  export class OnTaskLoadFailure{
    static readonly type = '[Tasks] On Tasks Load Failure';
    constructor(public error:string) {
    }
  }

  export class AddTask {
    static readonly type = '[Tasks] Add Task';
    constructor(public payload: { title: string; description: string }) {}
  }

  export class UpdateTask {
    static readonly type = '[Tasks] Update Task';
    constructor(public payload: { id: number; title?: string; description?: string }) {}
  }

  export class DeleteTask {
    static readonly type = '[Tasks] Delete Task';
    constructor(public payload: { id: number }) {}
  }
}
