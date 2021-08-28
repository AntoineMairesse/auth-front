import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User } from '../entities/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataSource = new BehaviorSubject<User>(new User());
  data = this.dataSource.asObservable();
  constructor() { }

  updatedDataSelection(data: User): void{
    this.dataSource.next(data);
  }

  isUserLoggedIn(): boolean {
    return (sessionStorage.getItem('token') !== null);
  }

}
