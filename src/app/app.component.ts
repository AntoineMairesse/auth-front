import {Component, OnInit} from '@angular/core';
import {UserService} from './Services/user.service';
import {Router} from '@angular/router';
import {WebSocketService} from './Services/web-socket.service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app-angular';

  constructor(public userService: UserService, private router: Router, private webSocketService: WebSocketService) {
    webSocketService.connect();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    this.router.navigate(['/login']).then();
  }
}
