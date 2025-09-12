import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { TaskModel } from '@tasker/shared';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { TasksActions } from '../../store';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'task-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatTooltip,
    NgClass,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView {
  task = input<TaskModel>();
  onChangeStatus
    = output<{taskId:string,changes:Partial<TaskModel>}>();
  onUpdateRequest = output<TaskModel>();

  private readonly store = inject(Store);

  onDelete(id: string) {
    this.store.dispatch(new TasksActions.OnDeleteTaskRequested(id));
  }

  allStatuses: TaskModel['status'][] = ['pending', 'in-progress', 'completed'];

  getAvailableStatuses(task: TaskModel) {
    return this.allStatuses.filter((s) => s !== task.status);
  }

  protected selectStatus(status: TaskModel['status']) {
    this.onChangeStatus.emit({taskId: this.task()!.id, changes: {status}});
  }



}
