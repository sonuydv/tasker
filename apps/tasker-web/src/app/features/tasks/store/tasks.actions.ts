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


  export class OnClickCreateNewTask{
    static readonly type = '[Tasks] On Click Create New Task';
  }

  export class AddTask {
    static readonly type = '[Tasks] Add Task';
    constructor(public task:Partial<TaskModel>) {}
  }

  export class OnTaskUpdateRequested {
    static readonly type = '[Tasks] On Task Update Requested';
    constructor(public task:TaskModel) {}
  }

  export class OnTaskStatusUpdateRequest{
    static readonly type = '[Tasks] On Task Status Update Request';
    constructor(public taskId:string, public changes:Partial<TaskModel>) {}
  }

  export class UpdateTask {
    static readonly type = '[Tasks] Update Task';
    constructor(public taskId:string, public changes:Partial<TaskModel>) {}
  }

  export class OnDeleteTaskRequested {
    static readonly type = '[Tasks] On Delete Task Requested';
    constructor(public taskId:string) {
    }
  }

  export class DeleteTask {
    static readonly type = '[Tasks] Delete Task';
    constructor(public taskId:string) {}
  }

  export class AddTaskSocket {
    static readonly type = '[Tasks] Add Task Socket';
    constructor(public task:TaskModel) {}
  }

  export class UpdateTaskSocket {
    static readonly type = '[Tasks] Update Task Socket';
    constructor(public task:TaskModel) {}
  }

  export class OnDeleteTaskSocket {
    static readonly type = '[Tasks] On Delete Task Socket';
    constructor(public taskId:string) {}
  }

}
