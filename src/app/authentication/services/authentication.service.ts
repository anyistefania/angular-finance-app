import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.local';
import {
  AuthUserResponse,
  SignInUser,
  LoginUser
} from '../interfaces/authentication.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected readonly URL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  signIn(data: SignInUser): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(this.URL + 'signup', data);
  }

  logIn(data: LoginUser): Observable<AuthUserResponse> {
    return this.http.post<AuthUserResponse>(this.URL + 'signin', data);
  }

  isLoggedIn() {
    const token = localStorage.getItem('access-token');
    return !!token;
  }
}
