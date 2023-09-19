import { LoginResponseModel } from './../models/login-res-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register-model';
import { LoginRequestModel } from '../models/login-req-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string ="https://dummyjson.com/"
  constructor(private httpClient:HttpClient) { }

  register(model:RegisterModel):Observable<RegisterModel>{
    return this.httpClient.post<RegisterModel>(
      this.apiUrl+"users/add",model
    )
  }

  login(model:LoginRequestModel):Observable<LoginResponseModel>{
    return this.httpClient.post<LoginResponseModel>(
      this.apiUrl+"auth/login",model 
    )
  }
    
  
}
