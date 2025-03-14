import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';
import { AccountResponseModel } from 'src/app/models/account/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  userAccountsUrl = `${environment.apiUrl}/accounts`;

  public getUserAccounts(): Observable<ResponseModel<AccountResponseModel[]>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.get<ResponseModel<AccountResponseModel[]>>(this.userAccountsUrl, { headers });
  }

  public createNewAccount(): Observable<ResponseModel<AccountResponseModel>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.post<ResponseModel<AccountResponseModel>>(this.userAccountsUrl, {}, { headers });
  }

  private buildAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getBankAccessToken()}`
    });
  }
  
}
