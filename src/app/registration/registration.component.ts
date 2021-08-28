import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../Services/authentication.service';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]);
  confirmPassword = new FormControl('', [Validators.required]);
  hide = true;
  usernameAlreadyTaken = false;
  passwordDontMatch = false;
  BACKEND_URL = 'http://localhost:8080';

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  Register(): void{
    if (this.password.value === this.confirmPassword.value){
      this.http.post(this.BACKEND_URL + '/api/auth/signup', {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
        user: 'user'
      }).subscribe( (res: any) => {
        console.log(res.error);
      }, err => {
        console.log(err);
      });
    }
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword(): string  {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('pattern') ? 'Your password must contain at least 8 characters one letter and one number' : '';
  }

  getErrorMessageUsername(): string{
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.usernameAlreadyTaken ? 'Username is already taken !' : '';
  }

  getErrorMessageConfirmPassword(): string {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordDontMatch ? 'Passwords don\'t match !' : '';
  }
}
