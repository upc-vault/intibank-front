import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';
import { LoanResponseModel } from 'src/app/models/loan/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  loanUrl = `${environment.apiUrl}/loan`;

  createLoanSimulation(data: { amount_loan: number, months: number }): Observable<ResponseModel<LoanResponseModel>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.post<ResponseModel<LoanResponseModel>>(`${this.loanUrl}/simulation`, data, { headers });
  }
  
  requestLoan(data: { dni: string, amount_loan: number, months: number }): Observable<ResponseModel<LoanResponseModel>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.post<ResponseModel<LoanResponseModel>>(`${this.loanUrl}/register`, data, { headers });
  }
  
  getLoansRequest(): Observable<ResponseModel<LoanResponseModel[]>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.get<ResponseModel<LoanResponseModel[]>>(`${this.loanUrl}/all`, { headers });
  }

  private buildAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getBankAccessToken()}`
    });
  }
  
}