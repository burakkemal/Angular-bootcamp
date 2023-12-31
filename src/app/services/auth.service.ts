import { LoginResponseModel } from './../models/login-res-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { LoginRequestModel } from '../models/login-req-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://dummyjson.com/';
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  register(model: RegisterModel): Observable<RegisterModel> {
    return this.httpClient.post<RegisterModel>(
      this.apiUrl + 'users/add',
      model
    );
  }

  login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.apiUrl + 'auth/login',
      model
    );
  }
  isAuthenticated() {
    let token = localStorage.getItem('access_token');
    if (!token) return false;
    try {
      let isExpired = this.jwtService.isTokenExpired();
      if (isExpired) return false;
    } catch (error) {
      return false;
    }
    return true;
  }

  isAuthorized(roles: string[]): boolean {
    let decodedToken = this.jwtService.decodeToken();
    let anyMatch = roles.some((e) => e == decodedToken.username);
    return anyMatch;
  }
}
