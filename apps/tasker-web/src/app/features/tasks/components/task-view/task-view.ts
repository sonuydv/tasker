import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TaskModel } from '@tasker/shared';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Store } from '@ngxs/store';
import { TasksActions } from '../../store';
import { MatTooltip } from '@angular/material/tooltip';

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
  ],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView {
  task = input<TaskModel>();

  private readonly store = inject(Store);

  onDelete(id: string) {
    this.store.dispatch(new TasksActions.OnDeleteTaskClicked(id));
  }
}
