import { ChangeDetectionStrategy, Component, computed, inject, NgModule, OnInit, signal } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { TasksStore } from './store';
import { TasksActions, TasksEffects } from './store';
import { TasksApi } from './api/tasks.api';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CardView } from './components/card-view/card-view';
import { BoardView } from './components/board-view/board-view';
import { MatRipple } from '@angular/material/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { TaskModel } from '@tasker/shared';
import { toSignal } from '@angular/core/rxjs-interop';

@NgModule({
  imports:[
    NgxsModule.forFeature([TasksStore])
  ],
  providers:[TasksApi]
})
export class TasksModule {}

@Component({
  selector: 'app-tasks',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TasksModule,
    MatIcon,
    MatIconButton,
    CardView,
    BoardView,
    MatRipple,
    FormsModule,
    MatTooltip,
    ReactiveFormsModule,
  ],
  providers: [TasksEffects],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  /*Initializing effects*/
  private readonly taskEffects = inject(TasksEffects);

  private readonly store = inject(Store);

  protected originalTasks = this.store.selectSignal(TasksStore.slices.tasks);
  protected isLoading = this.store.selectSignal(TasksStore.slices.isLoading);

  protected tasks = computed(()=>{
    const searchTerm = this.searchTerm()?.toLowerCase() ?? '';
    const allTasks = this.originalTasks();
    if(!searchTerm) return allTasks;
    return allTasks.filter(t=>t.title.toLowerCase().includes(searchTerm) || t.description?.toLowerCase().includes(searchTerm));
  });

  protected viewMode
    = signal<'default' | 'board'>('default');

  protected searchCtrl = new FormControl('');
  protected searchTerm
    = toSignal(this.searchCtrl.valueChanges);

  protected statusFilter
    = signal<'all' |'in-progress' | 'completed' | 'pending'>('all');


  ngOnInit(): void {
    this.store.dispatch(new TasksActions.OnTasksOpened());
  }

  onAddNew() {
    this.store.dispatch(new TasksActions.OnClickCreateNewTask());
  }

  onChange(ev:any){
    this.statusFilter.set(ev.target.value);
  }


  onTaskStatusUpdate(update: { taskId: string; changes: Partial<TaskModel> }) {
    this.store.dispatch(
      new TasksActions.OnTaskStatusUpdateRequest(update.taskId, update.changes)
    );
  }

  onTaskUpdate(task: TaskModel) {
    this.store.dispatch(new TasksActions.OnTaskUpdateRequested(task));
  }
}
