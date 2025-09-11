import { Component, Inject, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '@tasker/shared';
import { Store } from '@ngxs/store';
import { TasksActions } from '../../store';
import { NotificationService } from '../../../shared/notification.service';
import { finalize} from 'rxjs';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css',
})
export class CreateTask {
  protected form: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly notify = inject(NotificationService);
  private readonly dialogRef = inject(MatDialogRef);

  private readonly store = inject(Store);

  protected readonly isLoading = signal<boolean>(false);

  constructor(@Inject(MAT_DIALOG_DATA) public existingTask: TaskModel) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.existingTask) {
      this.form.patchValue({
        title: this.existingTask.title,
        description: this.existingTask.description,
      });
    }
  }

  protected onSubmit() {
    this.isLoading.set(true);
    if (this.form.valid) {
      if (this.existingTask) {
        this.store
          .dispatch(
            new TasksActions.UpdateTask({
              ...this.existingTask,
              ...this.form.value,
            })
          )
          .pipe(finalize(() => this.isLoading.set(false)))
          .subscribe({
            next: () => {
              this.notify.success('Task updated successfully');
              this.dialogRef.close();
            },
          });
      } else {
        this.store
          .dispatch(new TasksActions.AddTask(this.form.value))
          .pipe(finalize(() => this.isLoading.set(false)))
          .subscribe({
            next: () => {
              this.notify.success('Task created successfully')
              this.dialogRef.close();
            },
          });
      }
    }
  }
}
