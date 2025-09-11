import { ChangeDetectionStrategy, Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { TasksStore } from './store';
import { TasksActions, TasksEffects } from './store';
import { TasksApi } from './api/tasks.api';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CardView } from './components/card-view/card-view';
import { BoardView } from './components/board-view/board-view';

@NgModule({
  imports:[
    NgxsModule.forFeature([TasksStore])
  ]
})
export class TasksModule {}

@Component({
  selector: 'app-tasks',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TasksModule, MatIcon, MatIconButton, CardView, BoardView],
  providers: [TasksApi, TasksEffects],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  /*Initializing effects*/
  private readonly taskEffects = inject(TasksEffects);

  private readonly store = inject(Store);

  protected tasks = this.store.selectSignal(TasksStore.slices.tasks);
  protected isLoading = this.store.selectSignal(TasksStore.slices.isLoading);

  protected viewMode = signal<'default' | 'board'>('default');

  ngOnInit(): void {
    this.store.dispatch(new TasksActions.OnTasksOpened());
  }
}
