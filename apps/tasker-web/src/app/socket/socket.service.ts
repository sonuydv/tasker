import { inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


@Injectable()
export class SocketService {
  private readonly socket = inject(Socket);
  public get socketId(){
    return this.socket.id;
  }

  constructor() {
    this.socket.fromEvent('connect').subscribe(res=>{
      console.log('Socket connected: ',this.socket.id);
    });
  }

  connect(): void {
    if(!this.socket.connected) this.socket.connect();
  }

  disconnect(){
    this.socket.disconnect();
  }

  onEvent<T>(event: string): Observable<T> {
    return this.socket.fromEvent<T,string>(event);
  }

  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

}
