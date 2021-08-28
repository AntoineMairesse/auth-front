import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BACKEND_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.http.post(this.BACKEND_URL + '/api/auth/signin', {username, password});
  }

  LogOut(): void {
    sessionStorage.removeItem('token');
  }


}
