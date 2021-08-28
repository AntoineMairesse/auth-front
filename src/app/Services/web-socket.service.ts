import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() {}

  private stompClient = null;

  public connect(): void {
    const socket = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/socket/someoneJoined', res => {
        console.log(res);
      });
    });
  }

  public send(): void{
    if (this.stompClient != null){
      this.stompClient.send('/app/test', {}, 'ceci est un test');
    }
  }

}
