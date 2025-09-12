import { Component, input, output } from '@angular/core';
import { TaskModel } from '@tasker/shared';
import { TaskView } from '../task-view/task-view';

@Component({
  selector: 'app-card-view',
  imports: [
    TaskView,
  ],
  templateUrl: './card-view.html',
  styleUrl: './card-view.css',
})
export class CardView {
  tasks = input<TaskModel[]>();
  onChangeStatus = output<{taskId:string,changes:Partial<TaskModel>}>();
  onUpdateRequest = output<TaskModel>();
}
