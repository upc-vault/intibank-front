import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileModel } from 'src/app/models/profile/userProfile.model';
import { ResponseModel } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  profileUrl = `${environment.apiUrl}/profile`;

  public getUserProfile(): Observable<ResponseModel<UserProfileModel>> {
    const headers = this.buildAuthorizationHeader();
    return this.http.get<ResponseModel<UserProfileModel>>(this.profileUrl, { headers });
  }

  private buildAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getBankAccessToken()}`
    });
  }
}
