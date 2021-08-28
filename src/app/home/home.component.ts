import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../Services/user.service';
import {User} from '../entities/User';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user = sessionStorage.getItem('username');

  constructor(private userService: UserService, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  sendMessage(sendForm: NgForm): void {
    console.log(sendForm.value);
  }

  test(): void {
    this.http.get('http://localhost:8080/api/test/user',
      {headers: {Authorization: sessionStorage.getItem('token')}, responseType: 'text'}).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
