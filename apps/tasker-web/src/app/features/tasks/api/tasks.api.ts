import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '@tasker/shared';
import { SocketService } from '../../../socket/socket.service';


@Injectable()
export class TasksApi {

  private readonly http = inject(HttpClient);
  private readonly socket = inject(SocketService);

  constructor(
    @Inject('API_URL') private apiUrl: string,
  ) {
  }

  getTasks() {
    return this.http.get<TaskModel[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task: Partial<TaskModel>) {
    return this.http.post<TaskModel>(`${this.apiUrl}/tasks`, task,{
      headers: { "x-socket-id": this.socket.socketId!}
    });
  }

  updateTask(taskId: string, task: Partial<TaskModel>) {
    return this.http.patch<TaskModel>(`${this.apiUrl}/tasks/${taskId}`, task,{
      headers: { "x-socket-id": this.socket.socketId!}
    });
  }

  deleteTask(taskId: string) {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`,{
      headers: { "x-socket-id": this.socket.socketId!}
    });
  }

}
