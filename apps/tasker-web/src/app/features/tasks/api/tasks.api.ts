import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '@tasker/shared';


@Injectable()
export class TasksApi {

  private readonly http = inject(HttpClient);

  constructor(
    @Inject('API_URL') private apiUrl: string,
  ) {
  }

  getTasks() {
    return this.http.get<TaskModel[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Partial<TaskModel>) {
    return this.http.post<TaskModel>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(taskId: string, task: Partial<TaskModel>) {
    return this.http.put<TaskModel>(`${this.apiUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: string) {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`);
  }

}
