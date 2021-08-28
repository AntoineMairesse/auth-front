import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthInterceptorService implements HttpInterceptor {

  constructor(private http: HttpClient, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== 'http://localhost:8080/api/auth/refreshtoken') {
      if (sessionStorage.getItem('token')) {
        req = this.setAccessTokenHeader(req);
      }
      return next.handle(req).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.getNewAccessToken().pipe(
            switchMap((res: any) => {
              sessionStorage.setItem('token', 'Bearer ' + res.accessToken);
              sessionStorage.setItem('refreshToken', res.refreshToken);
              return next.handle(this.setAccessTokenHeader(req));
            }),
            catchError((err: any) => {
              sessionStorage.removeItem('refreshToken');
              sessionStorage.removeItem('token');
              this.router.navigate(['/login']).then();
              throw err;
            })
          );
        } else {
          this.router.navigate(['/login']).then();
        }
        return throwError(error);
      }));
    } else {
      return next.handle(req);
    }
  }

  getNewAccessToken(): Observable<object> {
    return this.http.post<any>('http://localhost:8080/api/auth/refreshtoken', {
      refreshToken: sessionStorage.getItem('refreshToken'),
    });
  }

  setAccessTokenHeader(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: sessionStorage.getItem('token')
      }
    });
  }

}
