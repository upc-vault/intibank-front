import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RegisterRequestModel } from '../../models/authentication/registerRequest.model';
import { ResponseModel } from '../../models/response.model';
import { authResponseModel } from '../../models/authentication/authResponse.model';
import { LoginRequestModel } from '../../models/authentication/loginRequest.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  registerUrl = `${environment.apiUrl}/auth/register`;
  loginUrl = `${environment.apiUrl}/auth/login`;


  constructor(private http: HttpClient) { }

  public register(user: RegisterRequestModel): Observable<ResponseModel<authResponseModel>> {
    return this.http.post<ResponseModel<authResponseModel>>(this.registerUrl, user);
  }

  public login(user: LoginRequestModel): Observable<ResponseModel<authResponseModel>> {
    return this.http.post<ResponseModel<authResponseModel>>(this.loginUrl, user);
  }

  public logout(): void {
    localStorage.removeItem('bank_access_token');
  }


  public setBankAccessToken(token: string): void {
    localStorage.setItem('bank_access_token', token);
  }

  public getBankAccessToken(): string | null {
    return localStorage.getItem('bank_access_token');
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('bank_access_token') != null;
  }
}
