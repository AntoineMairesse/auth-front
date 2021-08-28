import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../Services/authentication.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {UserService} from '../Services/user.service';
import {User} from '../entities/User';
import {WebSocketService} from '../Services/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  checked = false;
  error = false;

  username: string;
  password: string;
  message: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private cookie: CookieService,
    private router: Router,
    private readonly websocketService: WebSocketService) {
  }

  ngOnInit(): void {
    if (this.cookie.get('username') != null) {
      this.username = this.cookie.get('username');
      this.checked = true;
    }
  }

  Login(): void {
    this.authenticationService.authenticate(this.username, this.password).subscribe((res: any) => {


      const user = new User();
      user.id = res.id;
      user.email = res.email;
      user.username = res.username;
      user.roles = res.roles;
      this.userService.updatedDataSelection(user);

      const tokenStr = 'Bearer ' + res.accessToken;
      sessionStorage.setItem('token', tokenStr);
      sessionStorage.setItem('refreshToken', res.refreshToken);

      if (this.checked) {
        this.cookie.set('username', this.username);
      }
      this.error = false;
      this.router.navigate(['home']).then();
    }, () => {
      this.error = true;
    });
  }

  LogOut(): void {
    this.authenticationService.LogOut();
  }

  connect(): void {
    /*this.websocketService.initWebSocket().then(() => {
      this.websocketService.subscribe('socket/someoneJoined', (event) => {
        console.log(event);
      }).then();
    });*/
  }

  send(): void {
    this.websocketService.send();
  }
}
