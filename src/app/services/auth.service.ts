import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthResponse, LoginRequest, User} from '../interfaces/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>(); /*$ meen stream*/

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('api-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('api-token');
  }
/*  login(user: User): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const request: LoginRequest = {loginRequestDto: user};
    return this.http.post(`${environment.apiUrl}auth/login`, request, {headers}) /!*JSON.stringify({username, password})*!/
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)) /!*bind(this) used for this *!/
      );
  }*/

  login(user: User) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const request: LoginRequest = {loginRequestDto: user};
    return this.http.post(`${environment.apiUrl}auth/login`, request, {headers}) /*JSON.stringify({username, password})*/
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this)) /*bind(this) used for this */
      );
  }

  // getAuthUserInfo() {
  //   return this.http.get(`${environment.apiUrl}/auth/user-info`)
  //     .pipe(
  //       map(res => {
  //         return res.json();
  //       })
  //     );
  // }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token; /*!! cast to boolean*/
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('No such email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
    }
    return throwError(error);
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000) /*+ convert string to number*/
      localStorage.setItem('api-token', response.apiToken);
      localStorage.setItem('api-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  // private setToken(response: AuthResponse | null) {
  //   if (response) {
  //     const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000) /*+ convert string to number*/
  //     localStorage.setItem('api-token', response.apiToken);
  //     localStorage.setItem('api-token-exp', expDate.toString());
  //   } else {
  //     localStorage.clear();
  //   }
  // }

  socialLogin()/*: Observable<any> */{
    return this.http.get(`${environment.apiUrl}auth/social-login`).subscribe(() => {
      console.log('sent')
    })
  }

/*  getMe() {
    return this.http.get(`${environment.apiUrl}auth/me`).map(res => res.json());
  }*/
  registration(user: User): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${environment.apiUrl}auth/registration`, user, {headers})
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }
}
