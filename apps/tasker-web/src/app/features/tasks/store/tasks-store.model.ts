import { TaskModel } from '@tasker/shared';


export interface TasksStoreModel{
  tasks:TaskModel[];
  isLoading:boolean;
  error?:string;
}
