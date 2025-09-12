import { Component, computed, input, output } from '@angular/core';
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
  statusFilter = input<'all'|'pending'|'in-progress'|'completed'>('all');
  srcTasks = input<TaskModel[]>();

  tasks = computed(()=>{
    const status = this.statusFilter();
    const allTasks = this.srcTasks() ?? [];
    if(status === 'all') return allTasks;
    return allTasks.filter(t=>t.status === status);
  });



  onChangeStatus = output<{taskId:string,changes:Partial<TaskModel>}>();
  onUpdateRequest = output<TaskModel>();
}
