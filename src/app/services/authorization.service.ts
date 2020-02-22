import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AuthService} from 'angularx-social-login';

export interface User {
  id?: number;
  username?: string;
  email: string;
  password?: string;
  role?: string;
  locale?: string;
  theme?: string;
}

export interface LoginRequest { loginRequest: User; }

export interface LoginResponse {
  error: [];
  loginResponse: { token: string; };
}

export interface RegistrationRequest { registrationRequest: User; }

export interface RegistrationResponse {
  error: [];
  registrationResponse: { token: string; };
}

export interface SocialLoginResponse {
  error: [];
  socialLoginResponse: { token: string; };
}

export interface UserInfoResponse {
  error: [];
  authUser: User;
}

@Injectable({providedIn: 'root'})
export class AuthorizationService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}

  get token(): string { return localStorage.getItem('token'); }

  get id(): string { return JSON.parse(localStorage.getItem('user')).id; }

  get role(): string { return JSON.parse(localStorage.getItem('user')).role; }

  login(user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: LoginRequest = {loginRequest: user};
    console.log('LOGIN_REQUEST', request);
    return this.http.post<LoginResponse>(`${environment.apiUrl}auth/login`, JSON.stringify(request), {headers})
      .pipe(
        tap(
          response => {
            localStorage.setItem('token', response.loginResponse.token);
            console.log('LOGIN_RESPONSE', response);
        }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  socialLogin(user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: RegistrationRequest = {registrationRequest: user};
    console.log('SOCIAL_REGISTRATION_REQUEST', request);
    return this.http.post<SocialLoginResponse>(`${environment.apiUrl}auth/social-login`, JSON.stringify(request), {headers})
      .pipe(
        tap(
          response => {
            localStorage.setItem('token', response.socialLoginResponse.token);
            console.log('SOCIAL_REGISTRATION_RESPONSE', response);
          }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  registration(user: User): Observable<any> {
    const headers = new HttpHeaders().append('Content-Type', 'application/json');
    const request: RegistrationRequest = {registrationRequest: user};
    console.log('REGISTRATION_REQUEST', request);
    return this.http.post<RegistrationResponse>(`${environment.apiUrl}auth/registration`, JSON.stringify(request), {headers})
      .pipe(
        tap(
          response => {
            localStorage.setItem('token', response.registrationResponse.token);
            console.log('REGISTRATION_RESPONSE', response);
          }),
        catchError(errors => {
          this.error$.next(errors.error.error.messages[0]);
          return throwError(errors);
        })
      );
  }

  getUserInfo(): Observable<any> {
    return this.http.get<UserInfoResponse>(`${environment.apiUrl}auth/user-info`)
    .pipe(
      tap(response => {
        console.log('USER_INFO_RESPONSE', response);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.signOut();
    this.router.navigate(['profile', '/login']);
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') && localStorage.getItem('user'));
  }

  isAdmin(): boolean {
      return !!(this.isAuthenticated && this.role === 'ROLE_ADMIN');
  }
}
